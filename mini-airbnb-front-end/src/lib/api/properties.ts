import {api} from "./client";
import {FiltersState} from "@/types/filters";

export type PropertyItem = {
  id: string;
  imageUrl: string;
  title: string;
  city: string;
  state: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  type: string;
  isAvailable: boolean;
  bedrooms: number;
  guests: number;
  amenities?: string[];
};

export type PropertyDetail = PropertyItem & {
  amenities: string[];
  images: string[];
};

const transformItem = (raw: any): PropertyItem => ({
  id: String(raw.id),
  imageUrl: Array.isArray(raw.images) && raw.images.length ? raw.images[0] : "",
  title: raw.title,
  city: raw.location?.city ?? "",
  state: raw.location?.state ?? "",
  country: raw.location?.country ?? "",
  pricePerNight: raw.pricePerNight,
  rating: raw.rating,
  reviewsCount: raw.reviewsCount,
  type: raw.type,
  isAvailable: raw.isAvailable,
  bedrooms: raw.bedrooms,
  guests: raw.maxGuests,
  amenities: raw.amenities
});

const transformDetail = (raw: any): PropertyDetail => ({
  ...transformItem(raw),
  amenities: Array.isArray(raw.amenities) ? raw.amenities : [],
  images: Array.isArray(raw.images) ? raw.images : []
});

export const getProperties = async (filters?: FiltersState): Promise<PropertyItem[]> => {
  try {
    const {data} = await api.get("/properties");
    return Array.isArray(data) ? data.map(transformItem) : [];
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error);
    throw error;
  }
};

export const getPropertyById = async (id: string): Promise<PropertyDetail> => {
  try {
    const {data} = await api.get(`/properties/${id}`);
    return transformDetail(data);
  } catch {
    throw new Error(`Property with id ${id} not found`);
  }
};

export const simulateBooking = async (payload: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  customerName?: string;
}) => {
  try {
    const {data} = await api.post("/bookings", payload);
    return data;
  } catch {
    throw new Error("Failed to simulate booking");
  }
};
