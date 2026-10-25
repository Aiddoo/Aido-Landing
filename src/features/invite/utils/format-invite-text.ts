/** 문구의 `{name}` 자리를 초대한 사람의 닉네임으로 바꾼다. */
export function fillInviterName(template: string, name: string) {
  return template.replace("{name}", name);
}

/** 서버가 `#`을 붙여 보내든 아니든 화면에는 한 번만 붙인다. */
export function formatUserTag(userTag: string) {
  return `#${userTag.replace(/^#+/, "")}`;
}
