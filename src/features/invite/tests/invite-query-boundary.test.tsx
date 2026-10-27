// @vitest-environment happy-dom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getMessages } from "@/i18n/messages";
import { fetchInvitePreview } from "../api/fetch-invite-preview";
import { InviteLead } from "../components/invite-lead";
import { InviterCard } from "../components/inviter-card";
import { inviteCodeSchema } from "../schemas/invite.schema";

vi.mock("../api/fetch-invite-preview", () => ({
  fetchInvitePreview: vi.fn(),
}));

const { invite } = getMessages("ko");
const code = inviteCodeSchema.parse("BCD234");
let container: HTMLElement;
let root: Root;

beforeEach(() => {
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

async function renderInvite() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  await act(async () => {
    root.render(
      <QueryClientProvider client={queryClient}>
        <InviterCard labels={invite} code={code} />
        <InviteLead labels={invite} code={code} />
      </QueryClientProvider>,
    );
  });
}

describe("초대 쿼리 경계", () => {
  it("조회가 예상 밖으로 throw하면 Error를 보이고, 다시 시도하면 다시 조회해 모든 블록이 풀린다", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(fetchInvitePreview)
      .mockRejectedValueOnce(new Error("schema bug"))
      .mockResolvedValueOnce({
        status: "ready",
        inviter: { name: "아이두", profileImage: null },
      });
    await renderInvite();
    expect(container.querySelector("h1")?.textContent).toBe(
      invite.errors.renderError.title,
    );
    const retry = [...container.querySelectorAll("button")].find(
      (button) => button.textContent === invite.retry,
    );
    expect(retry).toBeDefined();
    await act(async () => retry?.click());
    expect(fetchInvitePreview).toHaveBeenCalledTimes(2);
    expect(container.querySelector("h1")?.textContent).toContain("아이두");
    expect(container.textContent).toContain(invite.lead);
    expect(container.textContent).not.toContain(invite.retry);
  });
});
