import { dehydrate } from "@tanstack/react-query";
import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { proxy } from "@/proxy";
import { fetchInvitePreview } from "../api/fetch-invite-preview";
import { getInviterCat } from "../data/inviter-cats";
import { usableInviteCode } from "../models/invite-preview";
import { getQueryClient } from "../providers/get-query-client";
import {
  getInvitePreviewQueryOptions,
  inviteQueryKeys,
} from "../queries/invite-queries";
import {
  INVITE_CODE_ALPHABET,
  inviteCodeSchema,
  parseInviteErrorCode,
  parseInvitePreview,
} from "../schemas/invite.schema";
import { fillInviterName } from "../utils/format-invite-text";
import {
  normalizeInviteCode,
  parseInviteCode,
  parseInviteCodeFromPathname,
} from "../utils/invite-code";
import { buildPlayStoreInviteUrl } from "../utils/invite-store-links";

describe("초대 코드", () => {
  it("대소문자·하이픈·공백을 정규화한다", () => {
    expect(normalizeInviteCode(" bcd-234 ")).toBe("BCD234");
  });
  it("서버와 같은 알파벳 6자만 허용한다", () => {
    expect(INVITE_CODE_ALPHABET).toHaveLength(27);
    expect(inviteCodeSchema.safeParse("BCD234").success).toBe(true);
    // 0, 1, I, L, O, U, Y, A, E는 알파벳에 없다
    for (const bad of ["ABC23", "BCD2345", "BCDEF0", "AEIOU2", "abc234", ""])
      expect(inviteCodeSchema.safeParse(bad).success).toBe(false);
  });
  it("/i/{코드} 주소에서만 코드를 읽는다", () => {
    expect(parseInviteCodeFromPathname("/i/bcd-234")).toBe("BCD234");
    expect(parseInviteCodeFromPathname("/i/BCD234/")).toBe("BCD234");
    expect(parseInviteCodeFromPathname("/ko/invite")).toBeNull();
    expect(parseInviteCodeFromPathname("/i/BCD2%")).toBeNull();
    expect(parseInviteCodeFromPathname("/i/BCD/234")).toBeNull();
  });
  it("라우트 세그먼트의 코드도 같은 규칙으로 읽는다", () => {
    expect(parseInviteCode("bcd-234")).toBe("BCD234");
    expect(parseInviteCode("BCD%2D234")).toBe("BCD234");
    expect(parseInviteCode("BCD2%")).toBeNull();
    expect(parseInviteCode("AEIOU2")).toBeNull();
  });
});

describe("Google Play 링크", () => {
  it("Install Referrer에 초대 코드를 인코딩해 싣는다", () => {
    const url = new URL(buildPlayStoreInviteUrl("BCD234"));
    expect(url.searchParams.get("id")).toBe("com.aido.mobile");
    expect(url.searchParams.get("listing")).toBe("invite");
    // 앱의 install referrer 파서가 읽는 키(inviteCode)와 같아야 한다.
    const referrer = url.searchParams.get("referrer") ?? "";
    expect(new URLSearchParams(referrer).get("inviteCode")).toBe("BCD234");
    expect(referrer).toBe("inviteCode=BCD234&utm_source=aido_landing");
    expect(url.search).toContain(
      "referrer=inviteCode%3DBCD234%26utm_source%3Daido_landing",
    );
  });
  it("코드가 없으면 referrer 없이 초대 등록정보로 보낸다", () => {
    const url = new URL(buildPlayStoreInviteUrl(null));
    expect(url.searchParams.has("referrer")).toBe(false);
    expect(url.searchParams.get("listing")).toBe("invite");
  });
});

function envelope(inviter: unknown) {
  return { success: true, data: { inviter }, timestamp: 1 };
}

describe("미리보기 응답", () => {
  it("서버 성공 봉투만 읽고 추가 필드는 허용한다", () => {
    const inviter = {
      name: "마루",
      profileImage: "siamese",
      extra: 1,
    };
    expect(parseInvitePreview(envelope(inviter))?.name).toBe("마루");
    expect(parseInvitePreview({ inviter })).toBeNull();
    expect(
      parseInvitePreview(envelope({ name: "마루", profileImage: 1 })),
    ).toBeNull();
    expect(parseInvitePreview(null)).toBeNull();
  });
  it("서버가 더는 보내지 않는 userTag가 와도 결과에 싣지 않는다", () => {
    const parsed = parseInvitePreview(
      envelope({ name: "마루", userTag: "MARU2026", profileImage: null }),
    );
    expect(parsed).toEqual({ name: "마루", profileImage: null });
  });
  it("서버가 길이를 제한하지 않는 긴 이름도 읽는다", () => {
    const name = "가".repeat(80);
    expect(
      parseInvitePreview(envelope({ name, profileImage: null }))?.name,
    ).toBe(name);
  });
  it("이름이 없는 초대한 사람도 읽는다", () => {
    const inviter = { name: null, profileImage: null };
    expect(parseInvitePreview(envelope(inviter))?.name).toBeNull();
    expect(fillInviterName("{name}님", null, "친구")).toBe("친구");
    expect(fillInviterName("{name}님", "마루", "친구")).toBe("마루님");
  });
  it("오류 코드는 알려진 INVITE 코드만 읽는다", () => {
    expect(parseInviteErrorCode({ error: { code: "INVITE_2102" } })).toBe(
      "INVITE_2102",
    );
    expect(parseInviteErrorCode({ error: { code: "AUTH_0101" } })).toBeNull();
  });
  it("프로필 이미지는 알려진 키만 고양이로 바꾸고 나머지는 기본 고양이다", () => {
    expect(getInviterCat("siamese")).toBe("/app-assets/cat-shyam.webp");
    expect(getInviterCat("https://example.com/a.jpg")).toBe(
      "/app-assets/cat-default.webp",
    );
    expect(getInviterCat(null)).toBe("/app-assets/cat-default.webp");
  });
});

describe("fetchInvitePreview", () => {
  afterEach(() => vi.unstubAllGlobals());
  function stubFetch(response: Response | Error) {
    const fetchMock = vi.fn(async () => {
      if (response instanceof Error) throw response;
      return response;
    });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }
  it("성공하면 초대한 친구를 돌려주고 인증 정보 없이 요청한다", async () => {
    const mock = stubFetch(
      Response.json(envelope({ name: "마루", profileImage: null })),
    );
    await expect(fetchInvitePreview("BCD234")).resolves.toMatchObject({
      status: "ready",
      inviter: { name: "마루" },
    });
    expect(mock).toHaveBeenCalledWith(
      "https://api.aido.kr/v1/invites/BCD234",
      expect.objectContaining({ credentials: "omit", method: "GET" }),
    );
  });
  it.each([
    [404, "INVITE_2101", "not_found"],
    [410, "INVITE_2102", "changed"],
    [403, "INVITE_2105", "unavailable"],
  ] as const)("%i %s는 %s", async (status, code, failure) => {
    stubFetch(
      Response.json(
        { success: false, error: { code, message: "x" } },
        { status },
      ),
    );
    await expect(fetchInvitePreview("BCD234")).resolves.toEqual({
      status: "failed",
      failure,
    });
  });
  it("본문이 없어도 상태 코드로 구분한다", async () => {
    stubFetch(new Response("", { status: 410 }));
    await expect(fetchInvitePreview("BCD234")).resolves.toEqual({
      status: "failed",
      failure: "changed",
    });
  });
  it("5xx·네트워크 오류·잘못된 본문은 unknown이다", async () => {
    stubFetch(new Response("{}", { status: 503 }));
    await expect(fetchInvitePreview("BCD234")).resolves.toEqual({
      status: "failed",
      failure: "unknown",
    });
    stubFetch(new TypeError("network"));
    await expect(fetchInvitePreview("BCD234")).resolves.toEqual({
      status: "failed",
      failure: "unknown",
    });
    stubFetch(Response.json(envelope({})));
    await expect(fetchInvitePreview("BCD234")).resolves.toEqual({
      status: "failed",
      failure: "unknown",
    });
  });
});

describe("usableInviteCode", () => {
  const ready = {
    status: "ready",
    inviter: { name: "마루", profileImage: null },
  } as const;
  it("없거나 바뀐 링크의 코드는 숨기고 네트워크 오류는 유지한다", () => {
    expect(usableInviteCode("BCD234", ready)).toBe("BCD234");
    expect(
      usableInviteCode("BCD234", { status: "failed", failure: "unknown" }),
    ).toBe("BCD234");
    for (const failure of [
      "invalid_code",
      "not_found",
      "changed",
      "unavailable",
    ] as const)
      expect(
        usableInviteCode("BCD234", { status: "failed", failure }),
      ).toBeNull();
  });
});

describe("초대 미리보기 쿼리", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("코드별 키를 쓴다", () => {
    expect(inviteQueryKeys.preview("BCD234")).toEqual([
      "invite",
      "preview",
      "BCD234",
    ]);
    expect(getInvitePreviewQueryOptions("BCD234").queryKey).toEqual(
      inviteQueryKeys.preview("BCD234"),
    );
  });
  it.each([
    [404, "not_found"],
    [410, "changed"],
    [503, "unknown"],
  ] as const)(
    "%i 응답도 reject하지 않고 실패 결과로 캐시해 dehydrate한다",
    async (status, failure) => {
      const fetchMock = vi.fn(async () => new Response("", { status }));
      vi.stubGlobal("fetch", fetchMock);
      const queryClient = getQueryClient();
      const options = getInvitePreviewQueryOptions("BCD234");
      await queryClient.prefetchQuery(options);
      expect(queryClient.getQueryData(options.queryKey)).toEqual({
        status: "failed",
        failure,
      });
      const [query] = dehydrate(queryClient).queries;
      expect(query?.state.data).toEqual({ status: "failed", failure });
      // staleTime 안에서는 같은 코드를 다시 요청하지 않는다.
      await queryClient.prefetchQuery(options);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    },
  );
  it("진행 중인 조회도 dehydrate해 브라우저가 같은 요청을 다시 보내지 않는다", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {})),
    );
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(getInvitePreviewQueryOptions("BCD234"));
    const [query] = dehydrate(queryClient).queries;
    expect(query?.state.status).toBe("pending");
    expect(query?.promise).toBeInstanceOf(Promise);
  });
});

describe("초대 링크 proxy", () => {
  function rewriteTarget(path: string) {
    const response = proxy(
      new NextRequest(`https://aido.kr${path}`, {
        headers: { "accept-language": "ko-KR" },
      }),
    );
    const target = response.headers.get("x-middleware-rewrite");
    return target === null ? null : new URL(target).pathname;
  }
  it("유효한 코드는 정규화해 요청마다 그리는 코드 페이지로 보낸다", () => {
    expect(rewriteTarget("/i/BCD234")).toBe("/ko/invite/BCD234");
    expect(rewriteTarget("/i/bcd-234")).toBe("/ko/invite/BCD234");
  });
  it("형식이 틀린 코드는 정적 초대 페이지로 보낸다", () => {
    expect(rewriteTarget("/i/AEIOU2")).toBe("/ko/invite");
    expect(rewriteTarget("/i/BCD2%")).toBe("/ko/invite");
  });
});
