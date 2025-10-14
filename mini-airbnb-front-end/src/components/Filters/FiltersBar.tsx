"use client";

import {useMemo} from "react";
import {Button, Input, InputNumber, Select, Slider, Space, Switch} from "antd";
import {useTranslations} from "next-intl";
import {FiltersState} from "@/types/filters";
import {PropertyItem} from "@/lib/api/properties";

type FiltersBarProps = {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  onApply: (filteredItems: PropertyItem[], appliedFilters: FiltersState) => void;
  onClear: () => void;
  sourceItems: PropertyItem[];
};

const normalize = (v: string) =>
  v.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function filterItems(items: PropertyItem[], filters: FiltersState) {
  return items.filter((item) => {
    if (filters.city && !normalize(item.city).includes(normalize(filters.city))) return false;
    if (filters.state && !normalize(item.state).includes(normalize(filters.state))) return false;
    if (filters.type && filters.type !== "all" && item.type !== filters.type) return false;

    const [minPrice, maxPrice] = filters.priceRange ?? [0, Infinity];
    if (item.pricePerNight < minPrice || item.pricePerNight > maxPrice) return false;

    if (typeof filters.guests === "number" && filters.guests > 0 && item.guests < filters.guests) return false;
    if (typeof filters.bedrooms === "number" && filters.bedrooms > 0 && item.bedrooms < filters.bedrooms) return false;

    if (filters.availableOnly && !item.isAvailable) return false;

    if (filters.amenities && filters.amenities.length > 0) {
      const itemAmenities = new Set((item.amenities || []).map((a) => normalize(a)));
      const allIncluded = filters.amenities.every((a) => itemAmenities.has(normalize(a)));
      if (!allIncluded) return false;
    }

    return true;
  });
}

export default function FiltersBar({value, onChange, onApply, onClear, sourceItems}: FiltersBarProps) {
  const t = useTranslations("filters");

  const propertyTypeOptions = useMemo(
    () =>
      [
        { value: "all", label: t("type") },
        { value: "Apartamento", label: t("types.apartment") },
        { value: "Casa", label: t("types.house") },
        { value: "Chalé", label: t("types.chalet") },
        { value: "Cabana", label: t("types.cabin") },
        { value: "Flat", label: t("types.flat") }
      ] as { value: any; label: string }[],
    [t]
  );

  const amenitiesOptions = useMemo(
    () => [
      { value: "wifi", label: t("amenities.wifi") },
      { value: "piscina", label: t("amenities.pool") },
      { value: "lareira", label: t("amenities.fireplace") },
      { value: "ar-condicionado", label: t("amenities.airConditioning") },
      { value: "cozinha-equipada", label: t("amenities.kitchen") },
      { value: "garagem", label: t("amenities.parking") }
    ],
    [t]
  );

  const handleApply = () => {
    const filtered = filterItems(sourceItems, value);
    onApply(filtered, value);
  };

  return (
    <div className="w-full bg-[var(--background)] text-[var(--foreground)] border border-[color:var(--color-foreground)]/10 rounded-xl p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder={t("city")}
          value={value.city ?? ""}
          onChange={(e) => onChange({...value, city: e.target.value})}
        />
        <Input
          placeholder={t("state")}
          value={value.state ?? ""}
          onChange={(e) => onChange({...value, state: e.target.value})}
        />
        <Select
          placeholder={t("type")}
          value={(value.type as any) ?? "all"}
          onChange={(v) => onChange({...value, type: v as any})}
          options={propertyTypeOptions}
        />
        <Select
          mode="multiple"
          placeholder={t("amenities.title")}
          value={value.amenities}
          onChange={(v) => onChange({...value, amenities: v})}
          options={amenitiesOptions}
        />

        <div className="col-span-2">
          <Slider
            range
            min={0}
            max={2000}
            value={value.priceRange}
            onChange={(v) => onChange({...value, priceRange: v as [number, number]})}
          />
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <span className="block text-sm text-[var(--muted)] mb-1">{t("guests")}</span>
              <InputNumber
                min={1}
                value={value.guests}
                className="w-full"
                onChange={(v) => onChange({...value, guests: v ? Number(v) : undefined})}
              />
            </div>
            <div>
              <span className="block text-sm text-[var(--muted)] mb-1">{t("bedrooms")}</span>
              <InputNumber
                min={1}
                value={value.bedrooms}
                className="w-full"
                onChange={(v) => onChange({...value, bedrooms: v ? Number(v) : undefined})}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>{t("availableOnly")}</span>
          <Switch
            checked={value.availableOnly}
            onChange={(checked) => onChange({...value, availableOnly: checked})}
          />
        </div>

        <div className="flex items-center justify-end gap-2 md:col-span-2 lg:col-span-1">
          <Space.Compact>
            <Button onClick={onClear}>{t("clear")}</Button>
            <Button type="primary" onClick={handleApply}>{t("apply")}</Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  );
}
