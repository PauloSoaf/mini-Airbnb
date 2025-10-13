export type PropertyType = "apartment" | "house" | "chalet" | "cabin" | "flat";

export type PropertyItem = {
  id: string | number;
  title: string;
  city: string;
  state: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  imageUrl: string;
  bedrooms: number;
  guests: number;
  type: PropertyType | string;
  amenities?: string[];
};

export type PropertyDetail = {
  id: string;
  title: string;
  city: string;
  state: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  available: boolean;
  amenities: string[];
  description: string;
  images: string[];
  type: string;
};
