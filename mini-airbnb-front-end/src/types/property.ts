export type Amenity =
  | 'wifi'
  | 'air-conditioning'
  | 'parking'
  | 'equipped-kitchen'
  | 'smart-tv'
  | 'washing-machine'
  | 'pool'
  | 'barbecue'
  | 'balcony'
  | 'ocean-view'
  | 'pet-friendly'
  | 'jacuzzi'
  | 'gym'
  | 'fireplace'
  | 'mountain-view'
  | 'beach-access'
  | 'beach-proximity'
  | 'city-view'
  | 'concierge'
  | 'historic-location'
  | 'arts-district'
  | 'garden'
  | 'cabin'
  | 'heating';

export type PropertyType =
  | 'all'
  | 'apartment'
  | 'house'
  | 'studio'
  | 'penthouse'
  | 'cabin'
  | 'condo'
  | 'loft';

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
