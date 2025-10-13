"use client";

import {useState} from "react";
import PropertyGrid from "@/components/PropertyGrid/PropertyGrid";
import FiltersBar from "@/components/Filters/FiltersBar";
import {FiltersState} from "@/types/filters";
import {PropertyItem} from "@/types/property";
import { mockProperties } from "@/lib/mockProperties";

const initialFilters: FiltersState = {
  city: "",
  state: "",
  type: "all",
  priceRange: [0, 2000],
  guests: 0,
  bedrooms: 0,
  amenities: [],
  availableOnly: false
};

export default function Home() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [filteredItems, setFilteredItems] = useState<PropertyItem[]>(mockProperties);

  const handleApply = (items: PropertyItem[]) => setFilteredItems(items);

  const handleClear = () => {
    setFilters(initialFilters);
    setFilteredItems(mockProperties);
  };

  return (
    <div className="space-y-6">
      <FiltersBar
        value={filters}
        onChange={setFilters}
        onApply={handleApply}
        onClear={handleClear}
        sourceItems={mockProperties}
      />
      <PropertyGrid items={filteredItems} />
    </div>
  );
}
