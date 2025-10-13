"use client";

import {useEffect, useMemo, useState} from "react";
import {Select} from "antd";
import {usePathname, useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";

type LocaleCode = "pt" | "en";

export default function LanguageSelect() {
  const translateLocales = useTranslations("locales");
  const router = useRouter();
  const pathname = usePathname();
  const rawLocale = useLocale();
  const currentLocale: LocaleCode = rawLocale === "pt" || rawLocale === "en" ? (rawLocale as LocaleCode) : "pt";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const selectOptions = useMemo(
    () => [
      {value: "pt" as LocaleCode, label: translateLocales("pt")},
      {value: "en" as LocaleCode, label: translateLocales("en")}
    ],
    [translateLocales]
  );

  if (!isMounted) return null;

  const handleChangeLocale = (nextLocale: LocaleCode) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || "/");
  };

  return (
    <Select<LocaleCode>
      value={currentLocale}
      onChange={handleChangeLocale}
      style={{width: 110}}
      options={selectOptions}
    />
  );
}
