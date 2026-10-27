"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MAX_WAIT_FRAMES = 90;

function findFocusTarget(target: Element) {
  const labelledBy = target.getAttribute("aria-labelledby");
  const heading =
    (labelledBy == null ? null : document.getElementById(labelledBy)) ??
    target.querySelector("h1, h2, h3");
  return heading ?? target;
}

function focusHashTarget(hash: string) {
  if (hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (target == null) return;
  const focusable = findFocusTarget(target);
  if (focusable.getAttribute("tabindex") == null) {
    focusable.setAttribute("tabindex", "-1");
  }
  if (focusable instanceof HTMLElement) {
    focusable.focus({ preventScroll: true });
  }
}

function focusWhenSettled(hash: string, frame = 0) {
  const arrived = window.location.hash === hash;
  const menuClosed =
    document.querySelector("[data-slot=sheet-content]") == null;
  if ((arrived && menuClosed) || frame >= MAX_WAIT_FRAMES) {
    if (arrived) focusHashTarget(hash);
    return;
  }
  requestAnimationFrame(() => focusWhenSettled(hash, frame + 1));
}

/** 해시 링크로 도착한 섹션 제목으로 포커스를 옮겨 스크린리더와 키보드 흐름이 이어지게 한다. */
export function HashFocus() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 쪽이 바뀔 때마다 도착한 해시를 다시 확인한다.
  useEffect(() => {
    focusHashTarget(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === "_blank"
      ) {
        return;
      }
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || url.hash === "") return;
      if (url.pathname !== window.location.pathname) return;
      focusWhenSettled(url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
