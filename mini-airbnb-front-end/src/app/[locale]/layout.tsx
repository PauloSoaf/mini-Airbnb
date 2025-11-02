import "antd/dist/reset.css";
import "../globals.css";
import Providers from "../providers";
import NavBar from "@/components/NavBar/NavBar";
import {AntdRegistry} from "@ant-design/nextjs-registry";

export function generateStaticParams() {
  return [{locale: "pt"}, {locale: "en"}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = (await import(`@/i18n/locales/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <Providers messages={messages} locale={locale as "pt" | "en"}>
            <NavBar locale={locale as "pt" | "en"} />
            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
