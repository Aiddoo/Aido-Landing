"use client";

import { Check, Copy } from "lucide-react";
import { useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MessageCatalog } from "@/i18n/messages";
import { useCopyText } from "../hooks/use-copy-text";

export type UpdateCopyLabels = Pick<
  MessageCatalog["patchNotes"],
  "copySummary" | "summaryCopied" | "copySummaryFallback" | "updateSummary"
>;

type Props = {
  text: string;
  labels: UpdateCopyLabels;
};

export function CopyUpdateSummary({ text, labels }: Props) {
  const { status, copy } = useCopyText(text);
  const fallbackId = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="release-copy">
      <Button
        type="button"
        variant="outline"
        className="release-copy-button"
        onClick={copy}
        disabled={status === "copying"}
      >
        {status === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {labels.copySummary}
      </Button>
      <p role="status" className="min-h-6 text-sm leading-6 text-foreground/75">
        {status === "copied" && labels.summaryCopied}
        {status === "manual" && labels.copySummaryFallback}
      </p>
      {status === "manual" && (
        <>
          <label htmlFor={fallbackId} className="sr-only">
            {labels.updateSummary}
          </label>
          <Textarea
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
