"use client";

import { Select } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const locales = ["pt", "en"] as const;
type Locale = (typeof locales)[number];

export default function LanguageSelect() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale: Locale = useMemo(() => {
    const seg = pathname.split("/")[1];
    return (locales as readonly string[]).includes(seg) ? (seg as Locale) : "pt";
  }, [pathname]);

  const onChange = (locale: Locale) => {
    const rest = pathname.replace(/^\/(pt|en)/, "");
    router.push(`/${locale}${rest || ""}`);
  };

  return (
    <Select
      value={currentLocale}
      onChange={onChange}
      style={{ width: 110 }}
      options={[
        { value: "pt", label: "🇧🇷 PT" },
        { value: "en", label: "🇺🇸 EN" }
      ]}
    />
  );
}
