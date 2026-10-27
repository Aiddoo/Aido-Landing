"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";
import type { ConsentChoice } from "../schemas/analytics.schema";

type AnalyticsConsentCardProps = Omit<
  ComponentProps<typeof Card>,
  "children" | "title"
> & {
  locale: Locale;
  labels: MessageCatalog["analyticsConsent"];
  privacyOptOut: boolean;
  storageError: boolean;
  onChoose: (choice: ConsentChoice) => void;
  onClose?: () => void;
};

export function AnalyticsConsentCard({
  locale,
  labels,
  privacyOptOut,
  storageError,
  onChoose,
  onClose,
  ...props
}: AnalyticsConsentCardProps) {
  const titleId = useId();
  const descriptionId = useId();
  const status = storageError
    ? labels.storageError
    : privacyOptOut
      ? labels.privacySignal
      : "";
  return (
    <Card
      role="region"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      size="sm"
      variant="elevated"
      {...props}
    >
      <CardHeader>
        <CardTitle id={titleId} className="font-sans text-caption font-bold">
          {labels.title}
        </CardTitle>
        <CardDescription id={descriptionId} className="text-micro">
          {labels.description}{" "}
          <Link
            href={localizedPath(locale, "/privacy")}
            className="font-semibold text-brand-deep underline underline-offset-2"
          >
            {labels.privacy}
          </Link>
        </CardDescription>
        {onClose && (
          <CardAction>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={labels.close}
              onClick={onClose}
            >
              <X aria-hidden="true" />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <p role="status" className="text-micro text-gray-8 empty:hidden">
          {status}
        </p>
        <HStack gap={2} className="mt-1">
          <Button
            variant="outline"
            className="h-10 flex-1"
            onClick={() => onChoose("rejected")}
          >
            {labels.reject}
          </Button>
          <Button
            variant="outline"
            className="h-10 flex-1"
            disabled={privacyOptOut}
            onClick={() => onChoose("accepted")}
          >
            {labels.accept}
          </Button>
        </HStack>
      </CardContent>
    </Card>
  );
}
