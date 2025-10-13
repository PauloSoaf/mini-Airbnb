"use client";

import {ConfigProvider, theme as antdTheme} from "antd";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider as NextThemeProvider, useTheme} from "next-themes";
import {NextIntlClientProvider} from "next-intl";
import {PropsWithChildren, useMemo, useState} from "react";

type ProvidersProps = PropsWithChildren & {
  messages: Record<string, unknown>;
  locale: "pt" | "en";
};

function AntdWrapper({children}: PropsWithChildren) {
  const {resolvedTheme} = useTheme();
  const isDark = resolvedTheme === "dark";
  const themeConfig = useMemo(() => {
    const colorPrimary = "#1677ff";
    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {colorPrimary, borderRadius: 12}
    };
  }, [isDark]);
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}

export default function Providers({children, messages, locale}: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <AntdWrapper>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </AntdWrapper>
      </QueryClientProvider>
    </NextThemeProvider>
  );
}
