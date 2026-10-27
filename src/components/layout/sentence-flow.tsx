import { Fragment } from "react";

/**
 * 문장마다 한 덩어리(inline-block)로 묶는다. 다음 문장이 남은 줄에 다 들어가지 않으면
 * 문장 경계에서 먼저 줄을 바꾸고, 한 문장이 길면 그 안에서 줄을 나눈다.
 */
export function SentenceFlow({ text }: { text: string }) {
  return text.split(/(?<=[.!?])\s+/).map((sentence, index) => (
    <Fragment key={sentence}>
      {index > 0 && " "}
      <span className="inline-block">{sentence}</span>
    </Fragment>
  ));
}
