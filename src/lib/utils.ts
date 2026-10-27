import { createCn } from "cn/config";

// globals.css의 사용자 토큰을 알려 줘야 text-body와 text-ink 같은 클래스가 서로 지워지지 않는다.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "display-md",
            "title-lg",
            "title",
            "body-lg",
            "body",
            "caption",
            "micro",
            "hand",
            "hand-lg",
          ],
        },
      ],
      shadow: [
        { shadow: ["card", "lift", "press-brand", "press-ink", "press-soft"] },
      ],
    },
  },
});
