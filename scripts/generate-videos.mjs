// 앱 화면 녹화(MP4)를 웹용 짧은 반복 영상(VP9 WebM + H.264 MP4)과 포스터(WebP)로 만든다.
// 원본은 저장소 밖에 있으므로 경로를 인자로 받는다. ffmpeg(libx264·libvpx-vp9)가 필요하며 CI에서는 실행하지 않는다.
//   pnpm videos:generate -- <원본 폴더(03_영상_GIF)>
// 녹화의 개발용 표시(오프라인 안내·DEV 배지·설정 버튼)는 crop으로 잘라 내고, 잘라 낸 결과를 사람이 확인한 뒤 커밋한다.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = process.argv.slice(2).find((arg) => arg !== "--");
if (!sourceRoot) {
  throw new Error("Usage: pnpm videos:generate -- <source folder>");
}

const outDir = "public/videos";
const catalogFile = "src/components/media/data/app-videos.ts";

// iOS 날씨 녹화(1206×2622)에서 위쪽 오프라인 안내·설정 버튼과 아래 DEV 배지를 뺀 하늘 부분(지역·기온·상태)만 쓴다.
const weatherSky = { crop: "1206:820:0:460", width: 540 };
const weatherScenes = {
  "weather-clear-night": "ios-CLEAR-night",
  "weather-mostly-clear": "ios-MOSTLY_CLEAR-day",
  "weather-partly-cloudy": "ios-PARTLY_CLOUDY-day",
  "weather-mostly-cloudy": "ios-MOSTLY_CLOUDY-day",
  "weather-cloudy": "ios-CLOUDY-day",
  "weather-foggy": "ios-FOGGY-day",
  "weather-hazy": "ios-HAZY-day",
  "weather-windy": "ios-WINDY-day",
  "weather-drizzle": "ios-DRIZZLE-day",
  "weather-rain-night": "ios-RAIN-night",
  "weather-heavy-rain": "ios-HEAVY_RAIN-day",
  "weather-thunderstorms-night": "ios-THUNDERSTORMS-night",
  "weather-sleet": "ios-SLEET-day",
  "weather-snow": "ios-SNOW-day",
  "weather-heavy-snow": "ios-HEAVY_SNOW-day",
  "weather-hail": "ios-HAIL-day",
  "weather-hot": "ios-HOT-day",
  "weather-frigid": "ios-FRIGID-day",
};

/** key → 원본·자르기·길이. start/duration은 초, posterAt은 잘라 낸 영상 안의 초 */
const recipes = {
  ...Object.fromEntries(
    Object.entries(weatherScenes).map(([key, name]) => [
      key,
      {
        source: `날씨/mp4/${name}.mp4`,
        ...weatherSky,
        start: 0,
        duration: 5,
        posterAt: 1,
        crf: { h264: 23, vp9: 33 },
      },
    ]),
  ),
  // Android 전체 화면. 아래쪽 DEV 배지(y≈2240)가 들어가지 않게 위 2200px만 쓴다.
  "weather-phone-thunderstorms": {
    source: "날씨/mp4/android-THUNDERSTORMS-night.mp4",
    crop: "1080:2200:0:0",
    width: 480,
    start: 0,
    duration: 4.3,
    posterAt: 1.2,
    crf: { h264: 23, vp9: 33 },
  },
  // 댓글 녹화(iOS, 개발용 표시 없음)는 홈 화면·앱 재실행 구간을 빼고 기능이 보이는 부분만 자른다.
  "comments-heart": {
    source: "댓글_하트/mp4/ios-double-tap-heart-light.mp4",
    width: 480,
    start: 33.6,
    duration: 6.4,
    posterAt: 0.5,
    crf: { h264: 24, vp9: 34 },
  },
  "comments-replies": {
    source: "댓글_하트/mp4/ios-expand-more-hide-light.mp4",
    width: 480,
    start: 26.9,
    duration: 8.8,
    posterAt: 4.3,
    crf: { h264: 24, vp9: 34 },
  },
  "comments-reply-keyboard": {
    source: "댓글_하트/mp4/ios-reply-keyboard-post-light.mp4",
    width: 480,
    start: 34,
    duration: 4.05,
    posterAt: 3.5,
    crf: { h264: 24, vp9: 34 },
  },
  "comments-notification": {
    source: "댓글_하트/mp4/ios-notification-anchor-highlight-light.mp4",
    width: 480,
    start: 30.7,
    duration: 4.7,
    posterAt: 1.0,
    crf: { h264: 24, vp9: 34 },
  },
};

const hash = (bytes) =>
  createHash("sha256").update(bytes).digest("hex").slice(0, 12);
const ffmpeg = (args) =>
  execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });

await mkdir(outDir, { recursive: true });
const work = await mkdtemp(path.join(tmpdir(), "aido-videos-"));
const catalog = {};
for (const [key, recipe] of Object.entries(recipes)) {
  const input = path.join(sourceRoot, recipe.source);
  // iOS 화면 녹화는 화면이 바뀔 때만 프레임을 남겨(40초에 178장) fps 필터나 -ss로 자르면 몇 초씩 어긋난다.
  // 원본 시각(pts) 그대로 trim한 뒤, 출력에서 빈 구간을 앞 프레임으로 채워 30fps로 만든다.
  const end = recipe.start + recipe.duration;
  const filters = [
    `trim=start=${recipe.start}:end=${end}`,
    "setpts=PTS-STARTPTS",
    recipe.crop && `crop=${recipe.crop}`,
    `scale=${recipe.width}:-2:flags=lanczos`,
    "format=yuv420p",
  ]
    .filter(Boolean)
    .join(",");
  const cfr = ["-fps_mode", "cfr", "-r", "30"];
  const mp4 = path.join(work, `${key}.mp4`);
  const webm = path.join(work, `${key}.webm`);
  const png = path.join(work, `${key}.png`);
  ffmpeg([
    "-i",
    input,
    ...cfr,
    "-vf",
    filters,
    "-an",
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-preset",
    "veryslow",
    "-crf",
    String(recipe.crf.h264),
    "-movflags",
    "+faststart",
    mp4,
  ]);
  ffmpeg([
    "-i",
    input,
    ...cfr,
    "-vf",
    filters,
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    String(recipe.crf.vp9),
    "-row-mt",
    "1",
    "-deadline",
    "good",
    "-cpu-used",
    "1",
    webm,
  ]);
  ffmpeg(["-ss", String(recipe.posterAt), "-i", mp4, "-frames:v", "1", png]);
  const posterBytes = await sharp(png).webp({ quality: 78 }).toBuffer();
  const { width, height } = await sharp(png).metadata();

  const files = {};
  for (const [kind, bytes] of [
    ["webm", await readFile(webm)],
    ["mp4", await readFile(mp4)],
    ["webp", posterBytes],
  ]) {
    const name = `${key}-${hash(bytes)}.${kind}`;
    await writeFile(path.join(outDir, name), bytes);
    files[kind] = { src: `/videos/${name}`, bytes: bytes.length };
  }
  catalog[key] = {
    webm: files.webm.src,
    mp4: files.mp4.src,
    poster: files.webp.src,
    width,
    height,
    bytes: {
      webm: files.webm.bytes,
      mp4: files.mp4.bytes,
      poster: files.webp.bytes,
    },
  };
  console.log(
    `${key}: ${width}×${height} webm ${(files.webm.bytes / 1024).toFixed(0)}KiB · mp4 ${(files.mp4.bytes / 1024).toFixed(0)}KiB · poster ${(files.webp.bytes / 1024).toFixed(0)}KiB`,
  );
}
await rm(work, { recursive: true, force: true });

const used = new Set(
  Object.values(catalog).flatMap((video) =>
    [video.webm, video.mp4, video.poster].map((src) => path.basename(src)),
  ),
);
for (const name of await readdir(outDir)) {
  if (!used.has(name)) await rm(path.join(outDir, name));
}

await writeFile(
  catalogFile,
  `// pnpm videos:generate로 만든 파일이다. 직접 고치지 않는다.\nexport const appVideos = ${JSON.stringify(catalog, null, 2)} as const;\n\nexport type AppVideoKey = keyof typeof appVideos;\n`,
);
execFileSync(
  "pnpm",
  [
    "exec",
    "biome",
    "format",
    "--write",
    catalogFile,
    "scripts/generate-videos.mjs",
  ],
  { stdio: "inherit" },
);
