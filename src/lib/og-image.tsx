import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

// 카카오톡·X가 2:1로 잘라도 글자가 남도록 위아래 여백(56px)을 둔다. 크롤러 호환 때문에 PNG로 낸다.
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// ImageResponse는 woff2를 읽지 못한다(docs/rendering-seo.md).
const fontDir = join(process.cwd(), "assets/og-fonts");
const [jua, wantedSans, logo] = await Promise.all([
  readFile(join(fontDir, "Jua-Regular.woff")),
  readFile(join(fontDir, "WantedSans-SemiBold.woff")),
  readFile(join(process.cwd(), "public/logo.png"), "base64"),
]);

const colors = {
  cream: "#fff8f2",
  brand: "#ff6b43",
  brandDeep: "#c2410c",
  brandSoft: "#ffe9df",
  ink: "#222222",
  gray: "#5b5149",
};

const plain = (text: string) => text.replaceAll(" ", " ");

export async function renderOgImage({
  locale,
  kicker,
  title,
  description,
  screenSrc,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  description: string;
  /** 제목의 \n은 줄바꿈이다. */
  screenSrc: string;
}) {
  const messages = getMessages(locale);
  // resvg가 WebP를 그리지 못해 PNG로 바꿔 넣는다.
  const screen = await sharp(join(process.cwd(), "public", screenSrc))
    .resize({ width: 552 })
    .png()
    .toBuffer();
  const titleSize = plain(title).length > 24 ? 52 : 62;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: colors.cream,
        fontFamily: "Wanted Sans",
        color: colors.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -140,
          top: -120,
          width: 680,
          height: 680,
          borderRadius: 9999,
          background: colors.brandSoft,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 700,
          padding: "56px 0 56px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* biome-ignore lint/performance/noImgElement: ImageResponse(Satori)는 next/image가 아닌 img만 그린다. */}
          <img
            src={`data:image/png;base64,${logo}`}
            width={56}
            height={56}
            alt=""
            style={{ borderRadius: 14 }}
          />
          <span style={{ fontFamily: "Jua", fontSize: 34 }}>
            {locale === "ko" ? "아이두" : "Aido"}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            style={{
              fontFamily: "Jua",
              fontSize: 30,
              color: colors.brandDeep,
            }}
          >
            {plain(kicker)}
          </span>
          <span
            style={{
              fontFamily: "Jua",
              fontSize: titleSize,
              lineHeight: 1.2,
              wordBreak: "keep-all",
              whiteSpace: "pre-line",
            }}
          >
            {plain(title)}
          </span>
          <span
            style={{
              fontSize: 25,
              lineHeight: 1.5,
              color: colors.gray,
              wordBreak: "keep-all",
              lineClamp: 2,
            }}
          >
            {plain(description)}
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 9999,
              background: colors.ink,
              color: colors.cream,
              fontSize: 22,
            }}
          >
            {plain(messages.meta.ogBadge)}
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 96,
          top: 64,
          display: "flex",
          padding: 12,
          borderRadius: 52,
          background: colors.ink,
          transform: "rotate(4deg)",
          boxShadow: "0 24px 60px rgba(120, 60, 30, 0.25)",
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: ImageResponse(Satori)는 next/image가 아닌 img만 그린다. */}
        <img
          src={`data:image/png;base64,${screen.toString("base64")}`}
          width={276}
          height={600}
          alt=""
          style={{
            borderRadius: 42,
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
    </div>,
    {
      ...ogImageSize,
      fonts: [
        { name: "Jua", data: jua, style: "normal", weight: 400 },
        { name: "Wanted Sans", data: wantedSans, style: "normal", weight: 600 },
      ],
    },
  );
}
