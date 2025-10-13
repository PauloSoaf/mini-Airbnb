"use client";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, theme as antdTheme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

interface ProvidersProps extends PropsWithChildren {
  messages: Record<string, unknown>;
  locale: "pt" | "en";
}

function AntdWrapper({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => setIsMounted(true), []);

  const themeConfig = useMemo(() => {
    const colorPrimary = "#1677ff";
    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary,
        borderRadius: 12,
        colorBgContainer: isDark ? "#0f0f0f" : "#ffffff",
        colorText: isDark ? "#f5f5f5" : "#171717",
        colorTextPlaceholder: isDark ? "rgba(255,255,255,0.65)" : "rgba(23,23,23,0.45)"
      }
    };
  }, [isDark]);

  if (!isMounted) return null;

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}

export default function Providers({ children, messages, locale }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <AntdWrapper>{children}</AntdWrapper>
        </QueryClientProvider>
      </NextThemeProvider>
    </NextIntlClientProvider>
  );
}
