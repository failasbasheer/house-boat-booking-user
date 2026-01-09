import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Category from '@/models/Category';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    try {
        await connectToDatabase();
        // Return only active categories
        const categories = await Category.find({ is_active: true });
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
    }
}
