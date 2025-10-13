"use client";

import Link from "next/link";
import LanguageSelect from "@/components/LanguageSelect/LanguageSelect";
import ThemeSelect from "@/components/ThemeSelect/ThemeSelect";

type Props = {
  locale: "pt" | "en";
};

export default function NavBar({ locale }: Props) {
  return (
    <nav className="w-full bg-[var(--background)] text-[var(--foreground)] border-b border-[color:var(--color-foreground)]/10 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-tight">
          Mini-Airbnb
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSelect />
          <ThemeSelect />
        </div>
      </div>
    </nav>
  );
}
