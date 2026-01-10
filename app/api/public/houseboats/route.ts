import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Houseboat } from '@/models/Houseboat';
import '@/models/Amenity'; // Register Amenity model
import '@/models/Feature'; // Register Feature model

export const revalidate = 60; // Cache for 1 minute (pricing availability might change)
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category'); // Optional category filter slug

        let query: any = { status: 'active' };

        // If sorting by category, we need the category ID 
        // This is simplified; ideally we populate category_id
        if (category) {
            // This requires a lookup first if we filter by slug on related model
            // For now, let's assume the frontend filters or we add logic later if needed
            // A better approach: Houseboat.find().populate('category_id')
        }

        const boats = await Houseboat.find(query)
            .populate('category_id')
            .populate('amenities')
            .populate('features');

        // Manual filter if needed
        let filteredBoats = boats;
        if (category) {
            filteredBoats = boats.filter((b: any) => b.category_id?.slug === category);
        }

        // Transform data to match frontend interfaces
        const transformedBoats = filteredBoats.map((boat: any) => {
            const boatObj = boat.toObject();
            return {
                ...boatObj,
                id: boatObj._id.toString(),
                categorySlug: boat.category_id?.slug || 'uncategorized',
                categoryName: boat.category_id?.name || 'Uncategorized',
                maxGuests: boat.capacity_adults + boat.capacity_children, // Computed helper
                pricePerNight: boat.price_override || boat.category_id?.base_price || 0, // Fallback to category price
            };
        });

        return NextResponse.json({ success: true, data: transformedBoats });
    } catch (error) {
        console.error("API Error", error);
        return NextResponse.json({ success: false, error: 'Failed to fetch houseboats' }, { status: 500 });
    }
}
