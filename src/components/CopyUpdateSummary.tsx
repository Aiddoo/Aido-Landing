"use client";

import { Check, Copy } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { MessageCatalog } from "@/i18n/messages";

export type UpdateCopyLabels = Pick<
  MessageCatalog["patchNotes"],
  "copySummary" | "summaryCopied" | "copySummaryFallback" | "updateSummary"
>;

type Props = {
  text: string;
  labels: UpdateCopyLabels;
};

export function CopyUpdateSummary({ text, labels }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const [copying, setCopying] = useState(false);
  const fallbackId = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);

  async function copy() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("manual");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className="release-copy">
      <button
        type="button"
        className="release-copy-button"
        onClick={copy}
        disabled={copying}
      >
        {status === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {labels.copySummary}
      </button>
      <p role="status" className="text-sm leading-6 text-foreground/75">
        {status === "copied" && labels.summaryCopied}
        {status === "manual" && labels.copySummaryFallback}
      </p>
      {status === "manual" && (
        <>
          <label htmlFor={fallbackId} className="sr-only">
            {labels.updateSummary}
          </label>
          <textarea
            id={fallbackId}
            ref={(element) => {
              textarea.current = element;
              if (element) {
                element.focus();
                element.select();
              }
            }}
            value={text}
            readOnly
            rows={8}
            onFocus={() => textarea.current?.select()}
            className="release-copy-text"
          />
        </>
      )}
    </div>
  );
}
