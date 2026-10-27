"use client";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { openAnalyticsSettings } from "../browser/analytics-settings-event";

type AnalyticsSettingsButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick"
>;

export function AnalyticsSettingsButton(props: AnalyticsSettingsButtonProps) {
  return <Button {...props} onClick={openAnalyticsSettings} />;
}
