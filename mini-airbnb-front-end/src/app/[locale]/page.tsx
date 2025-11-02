"use client";

import {useState, useMemo, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {Alert, Button, Skeleton, message} from "antd";
import {useTranslations} from "next-intl";
import FiltersBar from "@/components/Filters/FiltersBar";
import PropertyGrid from "@/components/PropertyGrid/PropertyGrid";
import {FiltersState} from "@/types/filters";
import {getProperties, PropertyItem} from "@/lib/api/properties";

const initialFilters: FiltersState = {
  city: "",
  state: "",
  type: "all",
  priceRange: [0, 2000],
  guests: undefined,
  bedrooms: undefined,
  amenities: [],
  availableOnly: false
};

export default function Home() {
  const t = useTranslations();
  const [messageApi, contextHolder] = message.useMessage();
  const [filtersDraft, setFiltersDraft] = useState<FiltersState>(initialFilters);
  const [filteredItems, setFilteredItems] = useState<PropertyItem[]>([]);

  const {
    data: sourceItems,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    refetch: refetchItems,
    error: queryError
  } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getProperties()
  });

  useEffect(() => {
    if (isErrorItems && queryError) {
      messageApi.error(t("apiError"));
    }
  }, [isErrorItems, queryError, messageApi, t]);

  const visibleItems = useMemo(() => filteredItems.length > 0 ? filteredItems : (sourceItems ?? []), [filteredItems, sourceItems]);

  const handleApply = (filtered: PropertyItem[]) => {
    setFilteredItems(filtered);
    if (filtered.length === 0) {
      messageApi.info(t("noResults"));
    }
  };
  
  const handleClear = () => {
    setFiltersDraft(initialFilters);
    setFilteredItems([]);
  };

  return (
    <div className="space-y-6">
      {contextHolder}
      <FiltersBar
        value={filtersDraft}
        onChange={setFiltersDraft}
        onApply={handleApply}
        onClear={handleClear}
        sourceItems={visibleItems}
      />

      {isErrorItems && (
        <Alert
          type="error"
          showIcon
          message={t("loadError")}
          action={<Button onClick={() => refetchItems()}>{t("retry")}</Button>}
        />
      )}

      {isLoadingItems ? (
        <div className="bg-[var(--background)] text-[var(--foreground)] border border-[color:var(--color-foreground)]/10 rounded-xl p-6">
          <Skeleton active paragraph={{rows: 6}} />
        </div>
      ) : (
        <PropertyGrid items={visibleItems} />
      )}
    </div>
  );
}
