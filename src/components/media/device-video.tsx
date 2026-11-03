import { AutoplayVideo } from "@/components/media/autoplay-video";
import {
  type AppVideoKey,
  appVideos,
} from "@/components/media/data/app-videos";
import {
  DeviceBezel,
  type DeviceFrame,
} from "@/components/media/device-screen";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export type DeviceVideoProps = {
  locale: Locale;
  video: AppVideoKey;
  device: DeviceFrame;
  /** 영상이 보여 주는 내용(대체 텍스트) */
  label: string;
  tone?: "ink" | "graphite" | undefined;
  /** 기기 바깥 틀의 className */
  className?: string | undefined;
};

/** 앱 화면 녹화를 기기 틀 안에서 반복 재생한다. 영상이 오기 전에도 같은 비율로 자리를 차지한다. */
export function DeviceVideo({
  locale,
  video,
  device,
  label,
  tone,
  className,
}: DeviceVideoProps) {
  const { webm, mp4, poster, width, height } = appVideos[video];
  return (
    <DeviceBezel
      device={device}
      ratio={width / height}
      tone={tone}
      className={className}
    >
      <AutoplayVideo
        webm={webm}
        mp4={mp4}
        poster={poster}
        aria-label={label}
        labels={getMessages(locale).media}
      />
    </DeviceBezel>
  );
}
