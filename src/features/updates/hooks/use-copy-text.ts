"use client";
import { useEffect, useRef, useState } from "react";
export function useCopyText(text: string) {
  const [status, setStatus] = useState<
    "idle" | "copying" | "copied" | "manual"
  >("idle");
  const mounted = useRef(false);
  const copying = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  async function copy() {
    if (copying.current) return;
    copying.current = true;
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(text);
      if (mounted.current) setStatus("copied");
    } catch {
      if (mounted.current) setStatus("manual");
    } finally {
      copying.current = false;
    }
  }
  return { status, copy };
}
