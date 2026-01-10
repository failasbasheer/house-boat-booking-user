
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import PackageModel from '@/models/Package';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDatabase();

        const packages = await PackageModel.find({ isActive: true })
            .select('slug title shortDescription priceDisplay images')
            .sort({ sortOrder: 1, createdAt: -1 })
            .lean();

        return NextResponse.json(packages);
    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch packages' },
            { status: 500 }
        );
    }
}
