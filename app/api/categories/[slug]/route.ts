import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const { slug } = params;

        const category = await Category.findOne({ slug });

        if (!category) {
            return NextResponse.json(
                { message: 'Category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
