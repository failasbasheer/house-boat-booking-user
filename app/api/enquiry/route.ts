import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Enquiry } from '@/models/Enquiry';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        // 1. Save to MongoDB
        const enquiry = await Enquiry.create(body);

        return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
    } catch (error) {
        console.error('Enquiry API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process enquiry' }, { status: 500 });
    }
}
