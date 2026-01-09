export interface Review {
  name: string;
  location: string;
  text: string;
}



export interface HouseboatTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  secondaryDescription?: string;
  duration?: string;
  guestCapacity?: string;
  amenitiesList?: { icon: string; title: string; desc: string }[];
  imagePlaceholder?: string;
  availableCount?: number;
  stats?: {
    rating: number;
  };
  reviews?: Review[];
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
}

export type PricingPlan = {
  title: string;
  duration: string;
  description: string;
  includes: string[];
  priceEstimate: string;
  bestFor: string;
};

export interface FAQItem {
  question?: string;
  answer?: string | string[];
  q?: string;
  a?: string;
  _id?: string;
}



// ... existing exports

export interface Category {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  shortDescription: string;
  priceDisplay: string; // e.g. "₹8,500 Onwards"
  guestCapacity: string;
  amenities: {
    icon: string;
    title: string;
    description: string;
  }[];
  stats: {
    totalBoats: number;
    rating: number;
  };
  heroImage: string;
  testimonials: Testimonial[];
  whatsappTemplate: string;
}

export interface Boat {
  id: string;
  name: string;
  slug: string;
  category_id?: string; // Mapped from ObjectId
  categorySlug?: string; // Optional, computed/populated
  priceDisplay?: string; // Optional override

  // Status & Core Specs
  status: 'active' | 'maintenance' | 'decommissioned';
  bedrooms: number;
  capacity_adults: number;
  capacity_children: number;
  maxGuests?: number; // Computed helper
  has_ac: boolean;
  cruise_hours: number;

  // Pricing
  price_override?: number;
  pricePerNight?: number; // Computed helper
  shared_package_availability?: boolean;

  // Visuals
  images: {
    hero: string;
    exterior?: string;
    interior?: string;
    bedroom?: string;
    dining?: string;
    bathroom?: string;
    extra1?: string;
    extra2?: string;
    extra3?: string;
    gallery?: string[];
  };

  // Content
  tagline?: string;
  shortPitch?: string;
  description?: string;
  secondaryDescription?: string;
  badges?: string[];
  notes?: string;

  // Features & Amenities
  amenities?: string[]; // Array of IDs or names depending on population
  features?: string[];

  // Rich Features
  crew?: {
    size: number;
    roles: string[];
  };
  dining?: {
    cuisineTypes: string[];
    isPrivate: boolean;
    wineSommelier?: boolean;
  };
  deck?: {
    type: string;
    seating?: string;
  };

  // Journey
  journeyFlow?: string[];
  scenicRoutes?: {
    name: string;
    duration: string;
    highlights: string;
  }[];

  // Legacy / Helpers
  isAvailable?: boolean;
  featured?: boolean;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}