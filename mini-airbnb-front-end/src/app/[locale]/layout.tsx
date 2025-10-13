import "../globals.css";
import Providers from "../providers";

import NavBar from "@/components/NavBar/NavBar";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "pt" | "en" }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/i18n/locales/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers messages={messages} locale={locale}>
          <NavBar locale={locale} />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
