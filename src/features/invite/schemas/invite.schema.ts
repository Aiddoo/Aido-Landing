import * as z from "zod/mini";

// 서버 계약(@aido/api INVITE_CODE)과 같은 규칙. 랜딩은 별도 패키지라 값을 복제하되
// 테스트로 형식을 고정한다.
export const INVITE_CODE_LENGTH = 6;
export const INVITE_CODE_ALPHABET = "23456789BCDFGHJKMNPQRSTVWXZ";

export const inviteCodeSchema = z
  .string()
  .check(
    z.regex(new RegExp(`^[${INVITE_CODE_ALPHABET}]{${INVITE_CODE_LENGTH}}$`)),
  );

// 서버 계약(invitePreviewInviterSchema)과 같다. 이름을 정하지 않은 사용자는 name이 null이다.
// 서버는 이름 길이를 제한하지 않으므로 여기서도 제한하지 않는다. 긴 이름은 CSS가 줄인다.
const inviterSchema = z.object({
  name: z.nullable(z.string()),
  profileImage: z.nullable(z.string()),
});
// 서버의 공통 성공 봉투 { success, data, timestamp }.
const previewEnvelopeSchema = z.object({
  success: z.literal(true),
  data: z.object({ inviter: inviterSchema }),
  timestamp: z.number(),
});

export const inviteErrorCodeSchema = z.enum([
  "INVITE_2101",
  "INVITE_2102",
  "INVITE_2105",
]);

export type InviteErrorCode = z.infer<typeof inviteErrorCodeSchema>;
export type InviteCode = z.infer<typeof inviteCodeSchema>;
export type InviteInviter = z.infer<typeof inviterSchema>;

/** 서버 성공 봉투에서 초대한 사람을 꺼낸다. 형식이 다르면 null이다. */
export function parseInvitePreview(body: unknown): InviteInviter | null {
  const envelope = previewEnvelopeSchema.safeParse(body);
  return envelope.success ? envelope.data.data.inviter : null;
}

const errorEnvelopeSchema = z.object({
  error: z.object({ code: z.string() }),
});

/** 오류 본문의 INVITE 코드를 읽는다. 알 수 없는 본문은 null이다. */
export function parseInviteErrorCode(body: unknown) {
  const envelope = errorEnvelopeSchema.safeParse(body);
  if (!envelope.success) return null;
  const code = inviteErrorCodeSchema.safeParse(envelope.data.error.code);
  return code.success ? code.data : null;
}
