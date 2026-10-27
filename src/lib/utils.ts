import { createCn } from "cn/engine";
import tables from "./cn-tables";

// next.config.ts의 withCn이 소스와 globals.css의 @theme(text-body·shadow-card 같은 사용자 토큰 포함)로
// 병합 표를 빌드 때 다시 만든다. 표에 없는 클래스는 병합하지 않고 그대로 둔다.
export const cn = createCn(tables);
