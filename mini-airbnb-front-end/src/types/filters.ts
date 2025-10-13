import {PropertyType} from "@/types/property";

export type FiltersState = {
  city?: string;
  state?: string;
  type?: PropertyType | "all";
  priceRange: [number, number];
  guests?: number;
  bedrooms?: number;
  amenities: string[];
  availableOnly: boolean;
};
