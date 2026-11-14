import { ArrowUpRight, Link2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { HStack, type HStackProps } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { INSTAGRAM_URL, LINK_HUB_URL, YOUTUBE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** YouTube 브랜드 가이드대로 비율·색을 바꾸지 않는다. */
function YouTubeIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 28 20" aria-hidden="true" {...props}>
      <path
        fill="#FF0000"
        d="M27.4 3.1A3.5 3.5 0 0 0 25 .6C22.8 0 14 0 14 0S5.2 0 3 .6A3.5 3.5 0 0 0 .6 3.1C0 5.3 0 10 0 10s0 4.7.6 6.9A3.5 3.5 0 0 0 3 19.4c2.2.6 11 .6 11 .6s8.8 0 11-.6a3.5 3.5 0 0 0 2.4-2.5C28 14.7 28 10 28 10s0-4.7-.6-6.9Z"
      />
      <path fill="#FFFFFF" d="m11.2 14.3 7.3-4.3-7.3-4.3v8.6Z" />
    </svg>
  );
}

function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export type SocialLinksProps = Omit<HStackProps, "children" | "render"> & {
  locale: Locale;
  variant?: "footer" | "pill";
};

export function SocialLinks({
  locale,
  variant = "footer",
  className,
  ...props
}: SocialLinksProps) {
  const { footer, cta } = getMessages(locale);
  const labels =
    variant === "pill"
      ? { youtube: cta.youtubeLabel, linkHub: cta.linkHubLabel }
      : { youtube: footer.youtubeLabel, linkHub: footer.linkHubLabel };
  const links = [
    {
      href: YOUTUBE_URL,
      label: labels.youtube,
      icon: <YouTubeIcon className="h-3.5 w-5 shrink-0" />,
    },
    {
      href: INSTAGRAM_URL,
      label: footer.instagramLabel,
      icon: <InstagramIcon className="size-4 shrink-0" />,
    },
    {
      href: LINK_HUB_URL,
      label: labels.linkHub,
      icon: <Link2 aria-hidden="true" className="size-4 shrink-0" />,
    },
  ];
  return (
    <HStack
      render={<ul />}
      wrap="wrap"
      className={cn(
        variant === "pill" ? "gap-2" : "flex-col items-start gap-0",
        className,
      )}
      {...props}
    >
      {links.map((link) => (
        <li key={link.href}>
          <ExternalLink
            href={link.href}
            newTabLabel={footer.externalLinkLabel}
            className={
              variant === "pill"
                ? "h-11 rounded-full bg-card px-4 text-caption font-semibold text-gray-10 shadow-press-soft hover:bg-brand-soft hover:text-brand-deep"
                : "min-h-11 text-caption font-medium text-gray-9 hover:text-brand-deep"
            }
            icon={link.icon}
          >
            {link.label}
          </ExternalLink>
        </li>
      ))}
    </HStack>
  );
}

function ExternalLink({
  href,
  newTabLabel,
  icon,
  className,
  children,
}: {
  href: string;
  newTabLabel: string;
  icon: ReactNode;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        className,
      )}
    >
      {icon}
      {children}
      <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
      <span className="sr-only">({newTabLabel})</span>
    </a>
  );
}
