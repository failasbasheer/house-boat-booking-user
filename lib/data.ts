
import { Category, Boat } from '@/types';

export interface Promotion {
    id: string;
    title: string;
    description: string;
    image?: string;
    code?: string;
    validUntil?: string;
    isActive: boolean;
}

export const PROMOTIONS: Promotion[] = [
    {
        id: 'promo-early-bird',
        title: 'Early Bird Alert!',
        description: 'Book 30 days in advance and get flat 15% OFF on all Premium & Luxury fleets.',
        image: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/sunset.jpg', // Using existing image
        code: 'EARLY15',
        isActive: true
    }
];



export const BOATS: Boat[] = [
    // Deluxe Boats
    {
        id: 'boat-d1',
        name: 'Classic Kettuvallam',
        slug: 'classic-kettuvallam',
        category_id: 'cat-deluxe',
        categorySlug: 'deluxe',
        status: 'active',
        bedrooms: 1,
        capacity_adults: 2,
        capacity_children: 1,
        has_ac: true,
        cruise_hours: 5,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/serene-waters.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/serene-waters.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0019 (3).jpg'
        },
        tagline: 'Traditional elegance',
        description: 'A beautiful single bedroom houseboat perfect for couples looking for a budget-friendly yet authentic experience.',
        pricePerNight: 8500,
        features: ['AC (9PM-6AM)', 'Kerala Cuisine', 'Upper Deck'],
        amenities: ['TV', 'Music System', 'Fishing Rods'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },
    {
        id: 'boat-d2',
        name: 'River Melody',
        slug: 'river-melody',
        category_id: 'cat-deluxe',
        categorySlug: 'deluxe',
        status: 'active',
        bedrooms: 2,
        capacity_adults: 4,
        capacity_children: 2,
        has_ac: true,
        cruise_hours: 5,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/backwater-sunset.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/backwater-sunset.webp',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior2.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0018 (3).jpg'
        },
        tagline: 'Family favorite',
        description: 'Spacious 2-bedroom boat ideal for small families.',
        pricePerNight: 12000,
        features: ['AC (9PM-6AM)', 'Kerala Cuisine', 'Sundeck'],
        amenities: ['TV', 'Music System', 'Games'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },
    {
        id: 'boat-d3',
        name: 'Green Haven',
        slug: 'green-haven',
        category_id: 'cat-deluxe',
        categorySlug: 'deluxe',
        status: 'active',
        bedrooms: 3,
        capacity_adults: 6,
        capacity_children: 2,
        has_ac: true,
        cruise_hours: 5,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/palm-lined-canals.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/palm-lined-canals.webp',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/chair.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250217-WA0123 (3).jpg'
        },
        tagline: 'Group getaway',
        description: 'Perfect for groups of friends, offering 3 cozy bedrooms.',
        pricePerNight: 16000,
        features: ['AC (9PM-6AM)', 'Kerala Cuisine', 'Open Lounge'],
        amenities: ['TV', 'Music System', 'Safety Jackets'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },

    // Premium Boats
    {
        id: 'boat-p1',
        name: 'Royal Heritage',
        slug: 'royal-heritage',
        category_id: 'cat-premium',
        categorySlug: 'premium',
        status: 'active',
        bedrooms: 2,
        capacity_adults: 4,
        capacity_children: 2,
        has_ac: true,
        cruise_hours: 6,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/premium-interiors.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/hero.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/premium-interiors.webp',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0019 (3).jpg'
        },
        tagline: 'Glass-walled luxury',
        description: 'Enjoy the view from your air-conditioned living area anytime.',
        pricePerNight: 18000,
        features: ['Full Time AC', 'Glass Windows', 'Premium Menu'],
        amenities: ['WiFi', 'Smart TV', 'Bluetooth Speaker'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },
    {
        id: 'boat-p2',
        name: 'Lake Prince',
        slug: 'lake-prince',
        category_id: 'cat-premium',
        categorySlug: 'premium',
        status: 'active',
        bedrooms: 3,
        capacity_adults: 6,
        capacity_children: 2,
        has_ac: true,
        cruise_hours: 6,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/onboard-dining.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/onboard-dining.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0018 (3).jpg'
        },
        tagline: 'Exquisite dining',
        description: 'Known for its exceptional onboard dining experience and spacious interiors.',
        pricePerNight: 24000,
        features: ['Full Time AC', 'Premium Dining', 'Sundeck'],
        amenities: ['WiFi', 'Karaoke', 'Fishing Gear'],
        crew: { size: 4, roles: ['Captain', 'Chef', 'Helper', 'Guide'] }
    },
    {
        id: 'boat-p3',
        name: 'Azure Pearl',
        slug: 'azure-pearl',
        category_id: 'cat-premium',
        categorySlug: 'premium',
        status: 'active',
        bedrooms: 4,
        capacity_adults: 8,
        capacity_children: 4,
        has_ac: true,
        cruise_hours: 6,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0013 (3).jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0013 (3).jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/chair.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250217-WA0121 (3).jpg'
        },
        tagline: 'Large family retreat',
        description: 'A massive 4-bedroom premium boat for extended families.',
        pricePerNight: 32000,
        features: ['Full Time AC', 'Large Lounge', 'Premium Service'],
        amenities: ['WiFi', 'Home Theatre', 'Board Games'],
        crew: { size: 5, roles: ['Captain', 'Chef', '2 Helpers', 'Manager'] }
    },

    // Luxury Boats
    {
        id: 'boat-l1',
        name: 'The Vaikundam',
        slug: 'the-vaikundam',
        category_id: 'cat-luxury',
        categorySlug: 'luxury',
        status: 'active',
        bedrooms: 2,
        capacity_adults: 4,
        capacity_children: 0,
        has_ac: true,
        cruise_hours: 7,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/luxury-houseboat-exterior.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/luxury-houseboat-exterior.webp',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/premium-interiors.webp',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0019 (3).jpg'
        },
        tagline: 'Floating palace',
        description: 'Experience royalty with jacuzzi, butler service and ultra-premium finishings.',
        pricePerNight: 45000,
        features: ['Central AC', 'Jacuzzi', 'Butler Service'],
        amenities: ['Starlink WiFi', 'Netflix', 'Minibar'],
        crew: { size: 4, roles: ['Captain', 'Executive Chef', 'Butler', 'Helper'] }
    },
    {
        id: 'boat-l2',
        name: 'Spice Coast Cruiser',
        slug: 'spice-coast-cruiser',
        category_id: 'cat-luxury',
        categorySlug: 'luxury',
        status: 'active',
        bedrooms: 1,
        capacity_adults: 2,
        capacity_children: 0,
        has_ac: true,
        cruise_hours: 7,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/hero.jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/hero.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior2.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250217-WA0123 (3).jpg'
        },
        tagline: 'Intimate luxury',
        description: 'A single bedroom luxury craft for those who demand the best.',
        pricePerNight: 35000,
        features: ['Central AC', 'Private Deck', 'Gourmet Meals'],
        amenities: ['High-speed WiFi', 'Premium Sound', 'Bathtub'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Butler'] }
    },
    {
        id: 'boat-l3',
        name: 'Majestic Waters',
        slug: 'majestic-waters',
        category_id: 'cat-luxury',
        categorySlug: 'luxury',
        status: 'active',
        bedrooms: 3,
        capacity_adults: 6,
        capacity_children: 2,
        has_ac: true,
        cruise_hours: 7,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/hero.jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/hero.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/onboard-dining.webp',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0018 (3).jpg'
        },
        tagline: 'Grandeur afloat',
        description: 'Three bedrooms of pure luxury, perfect for high-end corporate retreats or VIP families.',
        pricePerNight: 60000,
        features: ['Central AC', 'Conference Area', 'Full Service'],
        amenities: ['Video Conferencing', 'Bar Counter', 'Massage Chair'],
        crew: { size: 5, roles: ['Captain', 'Chef', 'Butler', '2 Helpers'] }
    },

    // Honeymoon
    {
        id: 'boat-h1',
        name: 'Cupid’s Arrow',
        slug: 'cupids-arrow',
        category_id: 'cat-honeymoon',
        categorySlug: 'honeymoon',
        status: 'active',
        bedrooms: 1,
        capacity_adults: 2,
        capacity_children: 0,
        has_ac: true,
        cruise_hours: 6,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/packages/honeymoon.webp',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/sunset.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0019 (3).jpg'
        },
        tagline: 'Pure romance',
        description: 'Special honeymoon suite with privacy and romantic ambiance.',
        pricePerNight: 15000,
        features: ['Flower Decor', 'Candlelight Dinner', 'AC Bedroom'],
        amenities: ['Privacy Screens', 'Bluetooth Speaker', 'Welcome Drink'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },
    {
        id: 'boat-h2',
        name: 'Love Birds',
        slug: 'love-birds',
        category_id: 'cat-honeymoon',
        categorySlug: 'honeymoon',
        status: 'active',
        bedrooms: 1,
        capacity_adults: 2,
        capacity_children: 0,
        has_ac: true,
        cruise_hours: 6,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/sunset.jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/sunset.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior2.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/thumbnail.jpg'
        },
        tagline: 'Sunset romance',
        description: 'Designed for couples to enjoy the stunning Alleppey sunsets in privacy.',
        pricePerNight: 16000,
        features: ['Sunset Cruise', 'Cake', 'Flower Bed'],
        amenities: ['Music System', 'Private Dining', 'Couple Shoot'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },
    {
        id: 'boat-h3',
        name: 'Eternal Bliss',
        slug: 'eternal-bliss',
        category_id: 'cat-honeymoon',
        categorySlug: 'honeymoon',
        status: 'active',
        bedrooms: 1,
        capacity_adults: 2,
        capacity_children: 0,
        has_ac: true,
        cruise_hours: 6,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250217-WA0121 (3).jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250217-WA0121 (3).jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/premium-interiors.webp',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0013 (3).jpg'
        },
        tagline: 'Luxury honeymoon',
        description: 'A premium honeymoon boat with glass walls and full-time AC.',
        pricePerNight: 22000,
        features: ['Full Time AC', 'Jacuzzi', 'Special Menu'],
        amenities: ['Photography props', 'Smart TV', 'Fruit Basket'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] }
    },

    // Shared
    {
        id: 'boat-s1',
        name: 'Community Cruiser',
        slug: 'community-cruiser',
        category_id: 'cat-shared',
        categorySlug: 'shared',
        status: 'active',
        bedrooms: 5,
        capacity_adults: 10,
        capacity_children: 5,
        has_ac: true,
        cruise_hours: 5,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/packages/budget.jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/packages/budget.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/chair.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250217-WA0123 (3).jpg'
        },
        tagline: 'Meet & Greet',
        description: 'A 5-bedroom boat where you book a single room. Great for meeting people.',
        pricePerNight: 5000,
        features: ['Private Room', 'Shared Dining', 'AC Bedroom'],
        amenities: ['Common TV', 'Card Games', 'Observation Deck'],
        crew: { size: 4, roles: ['Captain', 'Chef', '2 Helpers'] },
        price_override: 5000 // Per room
    },
    {
        id: 'boat-s2',
        name: 'Backwater Hostel',
        slug: 'backwater-hostel',
        category_id: 'cat-shared',
        categorySlug: 'shared',
        status: 'active',
        bedrooms: 4,
        capacity_adults: 8,
        capacity_children: 4,
        has_ac: true,
        cruise_hours: 5,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0018 (3).jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0018 (3).jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/interior.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/IMG-20250617-WA0019 (3).jpg'
        },
        tagline: 'Travelers choice',
        description: 'Economical way to enjoy the backwaters.',
        pricePerNight: 4500,
        features: ['Budget Friendly', 'Clean Rooms', 'Tasty Food'],
        amenities: ['WiFi', 'Charging Points', 'Lounge'],
        crew: { size: 3, roles: ['Captain', 'Chef', 'Helper'] },
        price_override: 4500
    },
    {
        id: 'boat-s3',
        name: 'Voyager Shared',
        slug: 'voyager-shared',
        category_id: 'cat-shared',
        categorySlug: 'shared',
        status: 'active',
        bedrooms: 6,
        capacity_adults: 12,
        capacity_children: 6,
        has_ac: true,
        cruise_hours: 5,
        images: {
            hero: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/serene-waters.jpg',
            exterior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/serene-waters.jpg',
            interior: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/onboard-dining.jpg',
            bedroom: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/collection/thumbnail.jpg'
        },
        tagline: 'Large group shared',
        description: 'A massive 6-bedroom boat with private rooms available.',
        pricePerNight: 5500,
        features: ['Spacious', 'Sundeck Access', 'All Meals'],
        amenities: ['Music', 'Deck Chairs', 'Filtered Water'],
        crew: { size: 5, roles: ['Captain', 'Chef', '3 Helpers'] },
        price_override: 5500
    }
];
