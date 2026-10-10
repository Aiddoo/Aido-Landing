"use client";
import {
  type ComponentType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import type { MotionControllerProps } from "./motion-controller";

export function MotionBoundary({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const [Controller, setController] =
    useState<ComponentType<MotionControllerProps> | null>(null);
  useEffect(() => {
    let disposed = false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function load() {
      window.removeEventListener("scroll", load);
      if (media.matches) return;
      frame = requestAnimationFrame(() => {
        void import("./motion-controller")
          .then(({ MotionController }) => {
            if (!disposed) setController(() => MotionController);
          })
          .catch(() => {
            /* Decorative motion is optional; content remains visible. */
          });
      });
    }
    // Keep GSAP downloads out of the initial LCP path. Scrolling is its first use.
    if (!media.matches) {
      if (window.scrollY > 0) load();
      else window.addEventListener("scroll", load, { passive: true });
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", load);
    };
  }, []);
  return (
    <div ref={scope} className="motion-boundary">
      {children}
      {Controller && <Controller scope={scope} />}
    </div>
  );
}
