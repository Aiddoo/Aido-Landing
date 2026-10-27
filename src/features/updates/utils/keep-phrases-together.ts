const NUMBER_WITH_UNIT = /(\d+) (days?|weeks?|months?|friends?|more friend)/g;
const SHORT_LAST_WORD = /(\S) (\S{1,7})$/u;

/**
 * 요약·스토어 문안은 그대로 복사해 스토어에 붙여 넣으므로 데이터에 줄바꿈 없는 공백을 넣지 않는다.
 * 화면에 그릴 때만 숫자와 단위("7 days")·"할 일"을 묶고, 마지막 짧은 낱말이 홀로 줄을 차지하지 않게 한다.
 */
export function keepPhrasesTogether(text: string) {
  return text
    .replace(
      NUMBER_WITH_UNIT,
      (_, count: string, unit: string) => `${count} ${unit.replace(" ", " ")}`,
    )
    .replace(SHORT_LAST_WORD, "$1 $2");
}
