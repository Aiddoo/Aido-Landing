import {
  BellRing,
  Cat,
  ChartColumn,
  Repeat,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";
import { match } from "ts-pattern";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { Grid, ListRow } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages, type MessageCatalog } from "@/i18n/messages";

type PremiumBenefitId =
  MessageCatalog["home"]["premium"]["benefits"][number]["id"];

/** 앱 구독 화면과 같은 프리미엄 혜택 목록 */
export function PremiumBenefitList({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { premium } = getMessages(locale).home;
  return (
    <Grid render={<ul />} columns={2} className={className}>
      {premium.benefits.map((benefit) => (
        <ListRow
          key={benefit.id}
          render={<li />}
          verticalPadding="xlarge"
          border="indented"
          leftAlignment="top"
          className="gap-4 last:border-b-0 sm:odd:mr-6 sm:even:ml-6 sm:nth-last-2:odd:border-b-0"
          left={
            <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand-deep">
              <BenefitIcon id={benefit.id} />
            </span>
          }
          contents={
            <>
              <h3 className="text-title">{benefit.title}</h3>
              <p className="mt-0.5 text-caption text-muted-foreground">
                {benefit.description}
              </p>
            </>
          }
        />
      ))}
    </Grid>
  );
}

function BenefitIcon({ id }: { id: PremiumBenefitId }) {
  const className = "size-5";
  return match(id)
    .with("aiParsing", () => (
      <Sparkles aria-hidden="true" className={className} />
    ))
    .with("nudge", () => <BrandMotif motif="paw" className={className} />)
    .with("friends", () => <Users aria-hidden="true" className={className} />)
    .with("reminder", () => (
      <BellRing aria-hidden="true" className={className} />
    ))
    .with("aiReport", () => (
      <ChartColumn aria-hidden="true" className={className} />
    ))
    .with("aiRepeat", () => <Repeat aria-hidden="true" className={className} />)
    .with("categories", () => <Tags aria-hidden="true" className={className} />)
    .with("appIcon", () => <Cat aria-hidden="true" className={className} />)
    .exhaustive();
}
