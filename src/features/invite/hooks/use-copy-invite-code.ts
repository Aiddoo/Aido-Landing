"use client";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../utils/copy-to-clipboard";

export type CopyStatus = "idle" | "copied" | "manual";

const RESET_MS = 2_500;

export function useCopyInviteCode(code: string | null) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const mounted = useRef(true);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  async function copy() {
    if (!code || busy.current) return;
    busy.current = true;
    const copied = await copyToClipboard(code);
    busy.current = false;
    if (!mounted.current) return;
    setStatus(copied ? "copied" : "manual");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), RESET_MS);
  }
  return { status, copy };
}
