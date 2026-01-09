import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Package } from '@/models/Package';

export const revalidate = 3600;

export async function GET() {
    try {
        await connectToDatabase();
        const packages = await Package.find({ isActive: true });
        return NextResponse.json({ success: true, data: packages });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch packages' }, { status: 500 });
    }
}
