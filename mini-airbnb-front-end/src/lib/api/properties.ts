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
    console.log("Buscando propriedades da API...");
    const {data} = await api.get("/properties");
    console.log("Dados recebidos:", data);
    return Array.isArray(data) ? data.map(transformItem) : [];
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error);
    return [];
  }
};

export const getPropertyById = async (id: string): Promise<PropertyDetail> => {
  try {
    const {data} = await api.get(`/properties/${id}`);
    return transformDetail(data);
  } catch (error) {
    console.error(`Erro ao buscar propriedade ${id}:`, error);
    throw error;
  }
};

export const simulateBooking = async (payload: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) => {
  try {
    const {data} = await api.post("/bookings", payload);
    return data;
  } catch (error) {
    console.error("Erro ao simular reserva:", error);
    throw error;
  }
};
