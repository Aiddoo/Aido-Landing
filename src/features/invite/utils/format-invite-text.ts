/** 문구의 `{name}` 자리를 초대한 사람의 닉네임으로 바꾼다. 이름이 null이면 fallback 문구를 쓴다. */
export function fillInviterName(
  template: string,
  name: string | null,
  fallback: string,
) {
  return name === null ? fallback : template.replace("{name}", name);
}

/** 서버가 `#`을 붙여 보내든 아니든 화면에는 한 번만 붙인다. */
export function formatUserTag(userTag: string) {
  return `#${userTag.replace(/^#+/, "")}`;
}
