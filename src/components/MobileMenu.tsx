"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type MobileMenuProps = {
  prefix: string;
  labels: {
    friends: string;
    download: string;
    patchNotes: string;
  };
};

export function MobileMenu({ prefix, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-[60] flex items-center justify-center w-10 h-10 wobbly-sm border-2 border-foreground bg-white hover:bg-brand hover:text-white active:scale-95 transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="transition-transform duration-200"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[55] bg-foreground/20"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Dropdown menu */}
      <div
        className={[
          "fixed top-[72px] right-4 left-4 z-[55] wobbly-md border-[3px] border-foreground bg-white hand-shadow-lg p-5 transition-all duration-200 origin-top",
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1">
          <a
            href={`${prefix}#friends`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-base font-bold text-foreground/70 hover:text-brand hover:bg-brand/5 wobbly-sm transition-colors"
          >
            <span className="text-lg" aria-hidden="true">
              🐱
            </span>
            {labels.friends}
          </a>

          <Link
            href={`${prefix}/patch-notes`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-base font-bold text-foreground/70 hover:text-brand hover:bg-brand/5 wobbly-sm transition-colors"
          >
            <span className="text-lg" aria-hidden="true">
              📋
            </span>
            {labels.patchNotes}
          </Link>

          <div className="my-2 h-[2px] border-t-2 border-dashed border-foreground/10" />

          <a
            href={`${prefix}#download`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 text-base font-bold text-white bg-brand wobbly-sm border-2 border-foreground hand-shadow hover:scale-[1.02] active:scale-95 transition-all"
          >
            {labels.download}
          </a>
        </nav>
      </div>
    </div>
  );
}
