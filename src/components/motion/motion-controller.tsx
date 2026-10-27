"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { createDuoUnfold } from "./duo-unfold-motion";
import { animateEntrances } from "./entrance-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export interface MotionControllerProps {
  scope: RefObject<HTMLDivElement | null>;
}

export function MotionController({ scope }: MotionControllerProps) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", (mediaContext) => {
        // Content is always visible. Animate inner ornaments so CSS rotation remains intact.
        const ornaments = root.querySelectorAll("[data-motion-ornament]");
        if (ornaments.length)
          gsap.fromTo(
            ornaments,
            { y: 8 },
            {
              y: 0,
              duration: 0.45,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "transform",
            },
          );
        // 나중에 불리는 콜백도 matchMedia 맥락에 기록해 동작 줄이기·언마운트 때 함께 되돌린다.
        const reveal = mediaContext.add("reveal", (element: Element) => {
          gsap.fromTo(
            element,
            { y: 12 },
            {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "transform",
            },
          );
        });
        const enter = mediaContext.add("enter", (elements: HTMLElement[]) =>
          animateEntrances(elements),
        );
        for (const element of root.querySelectorAll<HTMLElement>(
          "[data-motion-section], [data-motion-group]",
        )) {
          if (element.getBoundingClientRect().top < window.innerHeight)
            continue;
          ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            once: true,
            onEnter: () =>
              element.dataset.motionGroup == null
                ? reveal(element)
                : enter([
                    ...element.querySelectorAll<HTMLElement>("[data-motion]"),
                  ]),
          });
        }
        for (const stage of root.querySelectorAll<HTMLElement>(
          "[data-motion='duo']",
        ))
          createDuoUnfold(stage);
      });
      return () => media.revert();
    },
    { scope },
  );
  return null;
}
