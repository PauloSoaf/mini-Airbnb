"use client";

import { useEffect, useState } from "react";
import { Select } from "antd";
import { useTheme } from "next-themes";

export default function ThemeSelect() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Select
      value={theme === "system" ? "system" : resolvedTheme}
      onChange={(val) => setTheme(val)}
      style={{ width: 140 }}
      options={[
        { value: "light", label: "☀️ Light" },
        { value: "dark", label: "🌙 Dark" },
        { value: "system", label: "💻 System" }
      ]}
    />
  );
}
