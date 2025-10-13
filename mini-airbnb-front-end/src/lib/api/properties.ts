import {api} from "./client";
import {FiltersState} from "@/types/filters";
import {PropertyDetail, PropertyItem} from "@/types/property";

export const getProperties = async (filters: FiltersState): Promise<PropertyItem[]> => {
  const params: Record<string, string | number | boolean> = {};
  if (filters.city) params.city = filters.city;
  if (filters.state) params.state = filters.state;
  if (filters.type) params.type = filters.type;
  if (filters.priceRange?.length === 2) {
    params.minPrice = filters.priceRange[0];
    params.maxPrice = filters.priceRange[1];
  }
  if (typeof filters.guests === "number") params.guests = filters.guests;
  if (typeof filters.bedrooms === "number") params.bedrooms = filters.bedrooms;
  if (filters.availableOnly) params.available = true;
  if (filters.amenities?.length) params.amenities = filters.amenities.join(",");

  const {data} = await api.get<PropertyItem[]>("/properties", {params});
  return data;
};

export const getPropertyById = async (id: string): Promise<PropertyDetail> => {
  const {data} = await api.get<PropertyDetail>(`/properties/${id}`);
  return data;
};

export const simulateBooking = async (payload: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) => {
  const {data} = await api.post("/bookings", payload);
  return data;
};
