import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { appVideos } from "@/components/media/data/app-videos";
import {
  commentStoryVideos,
  weatherSceneVideos,
} from "@/features/feature-guides/data/guide-videos";
import { getMessages } from "@/i18n/messages";

const publicDir = path.join(process.cwd(), "public");
const MAX_VIDEO_BYTES = 1024 * 1024;
const MAX_POSTER_BYTES = 60 * 1024;

describe("앱 녹화 영상 카탈로그", () => {
  it("카탈로그의 영상·포스터가 실제 파일과 크기 예산에 맞는다", async () => {
    // Given 생성된 카탈로그
    const videos = Object.values(appVideos);
    // When 각 파일의 실제 크기를 읽으면
    const sizes = await Promise.all(
      videos.flatMap((video) => [
        stat(path.join(publicDir, video.webm)).then(
          (file) => [file.size, video.bytes.webm, MAX_VIDEO_BYTES] as const,
        ),
        stat(path.join(publicDir, video.mp4)).then(
          (file) => [file.size, video.bytes.mp4, MAX_VIDEO_BYTES] as const,
        ),
        stat(path.join(publicDir, video.poster)).then(
          (file) => [file.size, video.bytes.poster, MAX_POSTER_BYTES] as const,
        ),
      ]),
    );
    // Then 기록한 크기와 같고 예산을 넘지 않는다
    for (const [actual, recorded, limit] of sizes) {
      expect(actual).toBe(recorded);
      expect(actual).toBeLessThanOrEqual(limit);
    }
  });

  it("public/videos에는 카탈로그가 쓰는 파일만 있다", async () => {
    // Given 카탈로그가 가리키는 파일 이름
    const used = Object.values(appVideos).flatMap((video) =>
      [video.webm, video.mp4, video.poster].map((src) => path.basename(src)),
    );
    // When 폴더를 읽으면
    const files = await readdir(path.join(publicDir, "videos"));
    // Then 남은 이전 파일이 없다
    expect(files.toSorted()).toEqual(used.toSorted());
  });

  it("가이드 영상 순서와 한영 문구 개수가 같다", () => {
    // Given 두 언어의 가이드 문구
    for (const locale of ["ko", "en"] as const) {
      const { guides } = getMessages(locale).featureGuides;
      // Then 장면·이야기 영상마다 이름과 대체 텍스트가 있다
      expect(guides.weather.scenes).toHaveLength(weatherSceneVideos.length);
      expect(guides.comments.story).toHaveLength(commentStoryVideos.length);
    }
  });
});
