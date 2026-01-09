import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Promotion } from '@/models/Promotion';

export async function GET() {
    try {
        await connectToDatabase();
        // Fetch the most recent active promotion
        const promotion = await Promotion.findOne({ isActive: true }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: promotion });
    } catch (error) {
        console.error('Promotion Fetch Error:', error);
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}
