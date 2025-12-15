import { HouseboatTier, PricingPlan, Testimonial, FAQCategory } from './types';

export const WHATSAPP_NUMBER = "919876543210";
export const WHATSAPP_MESSAGE = "Hi, I'm interested in checking availability for a houseboat experience.";
export const CONTACT_PHONE = "+91 98765 43210";
export const CONTACT_EMAIL = "hello@alleppeyhouseboats.com";

export const HOUSEBOAT_TIERS: HouseboatTier[] = [
  {
    id: 'budget',
    name: 'Budget Friendly',
    tagline: 'Best Value',
    description: 'Great for budget travelers. 1-2 Bedrooms. Authentic experience without the premium price tag.',
    features: ['1-2 Bedrooms', 'All Meals Included', 'Village Tours', 'Authentic Experience'],
    audience: 'Budget',
    priceEstimate: 'From ₹8,500',
    imagePlaceholder: '/packages/budget.jpg',
    availableCount: 20
  },
  {
    id: 'deluxe',
    name: 'Explore Deluxe Boats',
    tagline: 'Most Popular',
    description: 'Full AC comfort with premium amenities, perfect for families and groups seeking the best balance of comfort and value.',
    features: ['Full AC Comfort', 'Ensuite Bathrooms', 'Delicious Local Cuisine', 'Great for Families'],
    audience: 'Most Popular',
    priceEstimate: 'From ₹11,000',
    imagePlaceholder: '/packages/deluxe.jpg',
    availableCount: 30
  },
  {
    id: 'premium',
    name: 'Explore Premium Boats',
    tagline: 'Luxury Experience',
    description: 'Ultimate Comfort. Glass-walled living spaces and full-time climate control for a seamless experience.',
    features: ['Glass-walled Lounge', 'Premium Interiors', '24/7 AC', 'Upper Deck Access'],
    audience: 'Premium',
    priceEstimate: 'From ₹16,000',
    imagePlaceholder: '/packages/premium.webp',
    availableCount: 10
  },
  {
    id: 'luxury',
    name: 'Explore Luxury Boats',
    tagline: 'Ultimate Comfort',
    description: '5-star amenities including jacuzzi, premium suites, and personalized service for the ultimate Kerala experience.',
    features: ['Jacuzzi / Bathtub', 'Gourmet Dining', 'Butler Service', 'Spacious Suites'],
    audience: 'Luxury',
    priceEstimate: 'From ₹25,000',
    imagePlaceholder: '/packages/luxury.webp',
    availableCount: 10
  },
  {
    id: 'honeymoon',
    name: 'Explore Romantic Packages',
    tagline: 'Romantic Experience',
    description: 'Specially designed for couples with romantic setup, flower decorations, and complete privacy for unforgettable moments.',
    features: ['Flower Decorations', 'Candlelight Dinner', 'Privacy Guaranteed', 'Honeymoon Cake'],
    audience: 'Couples',
    priceEstimate: 'From ₹18,000',
    imagePlaceholder: '/packages/honeymoon.webp',
    availableCount: 5
  }
];

export const PRICING_PACKAGES: PricingPlan[] = [
  {
    title: "Day Cruise Packages",
    duration: "11:00 AM - 5:00 PM",
    description: "Perfect for a quick yet immersive backwater experience. Enjoy a traditional lunch and sunset tea while cruising the serene canals.",
    includes: ["Welcome Drink", "Traditional Lunch", "Evening Tea & Snacks", "6 Hours Cruising"],
    priceEstimate: "From ₹8,500",
    bestFor: "Day Trippers"
  },
  {
    title: "Overnight Stay",
    duration: "12:00 PM - 9:00 AM",
    description: "The complete backwater experience. Sunset cruise, starlit dinner, and a peaceful night on the water. Wake up to the sounds of nature.",
    includes: ["Lunch, Dinner, Breakfast", "Candlelight Dinner Option", "21 Hours Onboard", "Private Bedroom"],
    priceEstimate: "From ₹12,000",
    bestFor: "Full Experience"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "The silence of the lake at night is something we'll never forget. It felt less like a hotel and more like a private sanctuary. The crew was incredibly professional.",
    author: "Elena & Marc",
    location: "Switzerland"
  },
  {
    id: 2,
    text: "Seamless booking via WhatsApp. I was worried about sending money abroad, but the team's transparency and the 'pay later' option made me feel very secure.",
    author: "Sarah J.",
    location: "United Kingdom"
  },
  {
    id: 3,
    text: "Far removed from the chaotic tourist traps. This felt like a curated boutique experience. We extended our stay by two days.",
    author: "Ahmed Al-Fayed",
    location: "UAE"
  }
];

export const FAQ_DATA: FAQCategory[] = [
  {
    title: "Booking & Information",
    items: [
      {
        question: "What's included in the houseboat booking?",
        answer: [
          "✓ Accommodation: Private rooms in chosen category (Deluxe/Premium/Luxury)",
          "✓ All Meals: Traditional Kerala breakfast, lunch, dinner, and evening snacks",
          "✓ Welcome Amenities: Fresh juice, tender coconut, and local snacks",
          "✓ Sightseeing: Backwater cruise with village visits and sunset views",
          "✓ Crew Service: Experienced captain, chef, and helper",
          "✓ Safety Equipment: Life jackets, first aid kit, and emergency contacts"
        ]
      },
      {
        question: "How far in advance should I book and do you offer instant confirmation?",
        answer: "We recommend booking at least 3-4 weeks in advance during peak season (Dec-Feb). For instant confirmation, you can reach us directly via WhatsApp."
      }
    ]
  },
  {
    title: "Experience & Safety",
    items: [
      {
        question: "Are houseboats safe for children, elderly guests, and non-swimmers?",
        answer: [
          "Yes, we have comprehensive safety measures:",
          "For Children: Child-safe railings, life jackets, 24/7 supervision.",
          "For Elderly: Comfortable seating, accessible bathrooms, boarding assistance.",
          "For Non-Swimmers: Mandatory life jackets for water activities, experienced crew assistance."
        ]
      },
      {
        question: "What food options are available and can you accommodate dietary restrictions?",
        answer: [
          "Standard Menu: Traditional Kerala cuisine including fresh fish, chicken, and vegetable curries.",
          "Dietary Accommodations: Vegetarian, Vegan, Jain, Gluten-Free, and Diabetic-friendly options available on request.",
          "Please inform us 24 hours in advance."
        ]
      },
      {
        question: "What activities are included?",
        answer: [
          "Sightseeing: Vembanad Lake cruise, village visits, bird watching.",
          "Cultural: Local interactions, seasonal boat races.",
          "Onboard: Fishing, cooking demos, games, music."
        ]
      }
    ]
  },
  {
    title: "General Information",
    items: [
      {
        question: "How do I reach the boarding point?",
        answer: [
          "Nearest Airport: Kochi International Airport (85 km).",
          "Nearest Train Station: Alappuzha Railway Station (3 km).",
          "We provide GPS coordinates and can arrange airport/station pickups."
        ]
      },
      {
        question: "What is the best time to visit?",
        answer: [
          "Peak Season (Dec-Feb): Cool weather, perfect for cruising.",
          "Shoulder Season (Mar-May, Sep-Nov): Good availability, fewer crowds.",
          "Monsoon (Jun-Aug): Lush greenery, nature lovers' paradise."
        ]
      },
      {
        question: "Do you provide Wi-Fi?",
        answer: "Wi-Fi is not standard on houseboats due to moving network coverage. Mobile network (Airtel/Jio) works in most areas. Premium boats may offer limited Wi-Fi."
      }
    ]
  }
];