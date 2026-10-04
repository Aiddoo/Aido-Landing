"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import type { MessageCatalog } from "@/i18n/messages";
export function MobileMenu({
  prefix,
  labels,
}: {
  prefix: string;
  labels: MessageCatalog["nav"];
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = useCallback(() => {
    if (ref.current) ref.current.open = false;
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape" && ref.current?.open) {
        close();
        ref.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        close();
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [close]);
  return (
    <details ref={ref} className="mobile-menu lg:hidden">
      <summary aria-label={labels.open} className="mobile-menu-button">
        <Menu size={20} aria-hidden="true" />
      </summary>
      <nav aria-label={labels.label} className="mobile-menu-panel">
        {[
          ["/services", labels.services],
          ["#guides", labels.guides],
          ["#friends", labels.friends],
          ["#faq", labels.faq],
          ["/patch-notes", labels.patchNotes],
          ["#download", labels.download],
        ].map(([path, label]) => (
          <Link key={path} href={`${prefix}${path}`} onClick={close}>
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
