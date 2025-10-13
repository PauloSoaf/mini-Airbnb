export type Amenity =
  | 'wifi'
  | 'ar-condicionado'
  | 'garagem'
  | 'cozinha-equipada'
  | 'smart-tv'
  | 'lavadora'
  | 'piscina'
  | 'churrasqueira'
  | 'varanda'
  | 'vista-mar'
  | 'pet-friendly'
  | 'jacuzzi'
  | 'academia';

export type PropertyType =
  | 'all'
  | 'apartment'
  | 'house'
  | 'chalet'
  | 'cabin'
  | 'flat'
  | 'loft'
  | 'studio'
  | 'penthouse';

export type Property = {
  id: number;
  title: string;
  type: string;
  location: { city: string; state: string; country: string };
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  sizeM2: number;
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  amenities: Amenity[];
  images: string[];
  host?: { name: string; superHost?: boolean; since?: string };
};

export type FiltersState = {
  city?: string;
  state?: string;
  type?: PropertyType | 'all';
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  bedrooms?: number;
  availableOnly?: boolean;
  amenities?: Amenity[];
};
