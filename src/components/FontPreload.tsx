"use client";

import { preload } from "react-dom";

export function FontPreload({ href }: { href: string }) {
  preload(href, {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return null;
}
