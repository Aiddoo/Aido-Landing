import { InviteErrorContentProvider } from "@/features/invite/providers/invite-error-content-provider";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";

export default async function InviteCodeLayout({
  children,
  params,
}: LayoutProps<"/[locale]/invite/[inviteCode]">) {
  const locale = resolveLocale((await params).locale);
  const { invite, storeButtons, accessibility } = getMessages(locale);
  return (
    <InviteErrorContentProvider
      value={{ locale, labels: invite, storeButtons, accessibility }}
    >
      {children}
    </InviteErrorContentProvider>
  );
}
