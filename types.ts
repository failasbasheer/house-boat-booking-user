export interface HouseboatTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  audience: string;
  priceEstimate: string; // e.g. "From ₹15k"
  imagePlaceholder: string;
  availableCount?: number;
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
  question: string;
  answer: string | string[]; // Can be string or array of strings for list items
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}