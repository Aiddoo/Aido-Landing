"use client";
import { useEffect, useRef, useState } from "react";
import { track } from "@/features/analytics/runtime/analytics-tracker";
import { copyToClipboard } from "../utils/copy-to-clipboard";

export type CopyStatus = "idle" | "copied" | "manual";

const RESET_MS = 2_500;

export function useCopyInviteCode(code: string | null) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    if (!code) return;
    const copied = await copyToClipboard(code);
    setStatus(copied ? "copied" : "manual");
    track({
      name: "invite_code_copy",
      copy_result: copied ? "copied" : "manual",
    });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), RESET_MS);
  }
  return { status, copy };
}
