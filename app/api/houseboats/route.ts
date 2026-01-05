import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Houseboat from '@/models/Houseboat';
import '@/models/Category'; // Ensure models are registered
import '@/models/Amenity';
import '@/models/Feature';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        await connectDB();

        // Parse Query Params
        const { searchParams } = new URL(request.url);
        const isSharedPackage = searchParams.get('shared_package_available') === 'true';

        // Build Query
        const query: any = {};
        if (isSharedPackage) {
            query.shared_package_availability = true;
        }

        // lean() returns plain JS objects, faster and easier to modify
        const boats = await (Houseboat as any).find(query)
            .populate('category_id')
            .populate('amenities')
            .populate('features')
            .lean();

        // Helper to safely parse price
        const parsePriceToNumber = (val: any): number => {
            if (!val) return 0;
            if (typeof val === 'number') return val;
            if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
            if (typeof val === 'object') {
                // Handle nested price_range structure found in DB
                if (val.price_range && val.price_range.min) return parseFloat(val.price_range.min) || 0;

                if (val.min) return parseFloat(val.min) || 0;
                if (val.toString) return parseFloat(val.toString()) || 0;
                if (val.$numberInt) return parseInt(val.$numberInt);
                if (val.$numberLong) return parseFloat(val.$numberLong);
                if (val.$numberDouble) return parseFloat(val.$numberDouble);
            }
            return 0;
        };

        const formatPriceRange = (val: any): string | null => {
            if (!val) return null;

            // Normalize val if it has price_range nesting
            const priceObj = (val.price_range) ? val.price_range : val;

            if (typeof priceObj === 'object' && priceObj.min && priceObj.max) {
                const min = parseFloat(priceObj.min), max = parseFloat(priceObj.max);
                if (min === max) return `₹${min.toLocaleString()}`;
                return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
            }
            const num = parsePriceToNumber(val);
            return num ? `₹${num.toLocaleString()}` : null;
        };

        // Transform data for frontend
        const transformedBoats = boats.map((boat: any) => ({
            ...boat,
            id: boat._id.toString(),
            // Map category_id to slug
            categorySlug: boat.category_id?.slug || boat.categorySlug || 'premium',
            // Dynamic Details (from DB)
            amenities: boat.amenities?.map((a: any) => a.name) || [],
            features: boat.features?.map((f: any) => f.name) || [],
            badges: boat.badges || [],
            scenicRoutes: boat.scenicRoutes || [],

            // Core mappings
            maxGuests: boat.capacity_adults || boat.maxGuests || 0,
            pricePerNight: parsePriceToNumber(boat.price_override) || parsePriceToNumber(boat.category_id?.base_price) || 0,
            displayPrice: formatPriceRange(boat.price_override) || formatPriceRange(boat.category_id?.base_price) || 'Price on Request',


            // Ensure images is safe
            images: boat.images || {},

            // Default content
            description: boat.description || boat.shortPitch || 'No description available.',
            isAvailable: boat.status === 'active', // Simple status check
            shared_package_availability: boat.shared_package_availability || false
        }));

        return NextResponse.json(transformedBoats);
    } catch (error) {
        console.error('Failed to fetch houseboats:', error);
        return NextResponse.json({ error: 'Failed to fetch houseboats' }, { status: 500 });
    }
}
