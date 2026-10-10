"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP);
export interface MotionControllerProps {
  scope: RefObject<HTMLDivElement | null>;
}
export function MotionController({ scope }: MotionControllerProps) {
  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe) return;
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
        const reveal = contextSafe((element: Element) => {
          mediaContext.add(() => {
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
        });
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              reveal(entry.target);
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.12 },
        );
        for (const element of root.querySelectorAll("[data-motion-section]")) {
          if (element.getBoundingClientRect().top >= window.innerHeight)
            observer.observe(element);
        }
        return () => observer.disconnect();
      });
      return () => media.revert();
    },
    { scope },
  );
  return null;
}
