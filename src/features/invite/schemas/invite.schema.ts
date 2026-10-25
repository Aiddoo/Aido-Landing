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

// 응답 형식은 아직 확정 중이다. 필요한 필드만 검증하고 나머지는 허용한다.
const inviterSchema = z.object({
  name: z.string().check(z.minLength(1), z.maxLength(60)),
  userTag: z.string().check(z.minLength(1), z.maxLength(24)),
  profileImage: z.optional(z.nullable(z.string())),
});
const previewBodySchema = z.object({ inviter: inviterSchema });
const previewEnvelopeSchema = z.object({ data: previewBodySchema });

export const inviteErrorCodeSchema = z.enum([
  "INVITE_2101",
  "INVITE_2102",
  "INVITE_2105",
]);

export type InviteCode = z.infer<typeof inviteCodeSchema>;
export type InviteInviter = z.infer<typeof inviterSchema>;

/** `{ inviter }` 또는 공통 성공 봉투 `{ success, data: { inviter } }`를 모두 받는다. */
export function parseInvitePreview(body: unknown): InviteInviter | null {
  const bare = previewBodySchema.safeParse(body);
  if (bare.success) return bare.data.inviter;
  const wrapped = previewEnvelopeSchema.safeParse(body);
  return wrapped.success ? wrapped.data.data.inviter : null;
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
