"use client";

import { noop } from "es-toolkit";
import { Pause, Play } from "lucide-react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AutoplayVideoProps = Omit<
  ComponentProps<"video">,
  | "src"
  | "poster"
  | "children"
  | "autoPlay"
  | "muted"
  | "loop"
  | "playsInline"
  | "preload"
  | "controls"
> & {
  webm: string;
  mp4: string;
  poster: string;
  /** 재생·일시정지 버튼의 낭독 문구 */
  labels: { play: string; pause: string };
};

/**
 * 소리 없는 짧은 반복 영상. 화면 근처에 왔을 때만 내려받아 재생하고(preload="none"), 벗어나면 멈춘다.
 * 동작 줄이기 설정에서는 포스터만 보여 주며, 버튼으로 직접 재생·정지할 수 있다(WCAG 2.2.2).
 * 부모가 비율 상자(AspectRatio)를 만들고, 영상은 그 안을 채운다.
 */
export function AutoplayVideo({
  webm,
  mp4,
  poster,
  labels,
  className,
  ...props
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUserRef = useRef(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !reducedMotion.matches && !pausedByUserRef.current) {
        video.play().catch(noop);
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(video);
    reducedMotion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      video.pause();
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (video.paused) {
      pausedByUserRef.current = false;
      video.play().catch(noop);
    } else {
      pausedByUserRef.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="none"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        className={cn("absolute inset-0 size-full object-cover", className)}
        {...props}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={paused ? labels.play : labels.pause}
        onClick={toggle}
        className="absolute right-2 bottom-2 z-1 rounded-full bg-ink/55 text-cream backdrop-blur-sm hover:bg-ink/75 hover:text-cream dark:hover:bg-ink/75"
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </Button>
    </>
  );
}
