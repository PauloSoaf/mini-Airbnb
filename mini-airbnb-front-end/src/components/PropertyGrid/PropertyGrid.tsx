"use client";

import {Empty} from "antd";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import {PropertyItem} from "@/types/property";
import {useTranslations} from "next-intl";

type PropertyGridProps = {
  items: PropertyItem[];
};

export default function PropertyGrid({items}: PropertyGridProps) {
  const t = useTranslations("grid");

  if (items.length === 0) {
    return (
      <div className="bg-[var(--background)] text-[var(--foreground)] border border-[color:var(--color-foreground)]/10 rounded-xl p-8">
        <Empty description={t("noResults")} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((propertyItem) => (
        <PropertyCard key={propertyItem.id} {...propertyItem} />
      ))}
    </div>
  );
}
