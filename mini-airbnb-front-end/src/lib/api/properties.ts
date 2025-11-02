import {api} from "./client";

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

const transformItem = (raw: Record<string, unknown>): PropertyItem => ({
  id: String(raw.id),
  imageUrl: Array.isArray(raw.images) && raw.images.length ? raw.images[0] : "",
  title: raw.title as string,
  city: (raw.location as Record<string, unknown>)?.city as string ?? "",
  state: (raw.location as Record<string, unknown>)?.state as string ?? "",
  country: (raw.location as Record<string, unknown>)?.country as string ?? "",
  pricePerNight: raw.pricePerNight as number,
  rating: raw.rating as number,
  reviewsCount: raw.reviewsCount as number,
  type: raw.type as string,
  isAvailable: raw.isAvailable as boolean,
  bedrooms: raw.bedrooms as number,
  guests: raw.maxGuests as number,
  amenities: raw.amenities as string[]
});

const transformDetail = (raw: Record<string, unknown>): PropertyDetail => ({
  ...transformItem(raw),
  amenities: Array.isArray(raw.amenities) ? raw.amenities : [],
  images: Array.isArray(raw.images) ? raw.images : []
});

export const getProperties = async (): Promise<PropertyItem[]> => {
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
