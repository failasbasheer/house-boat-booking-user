
import { Category } from '@/types';
import connectToDatabase from '@/lib/db';
import CategoryModel from '@/models/Category';

export async function getAllCategories(): Promise<Category[]> {
    await connectToDatabase();
    // Use .lean() to get POJOs and map _id to string if needed
    const docs = await CategoryModel.find({ is_active: true }).lean();
    return JSON.parse(JSON.stringify(docs)); // Simple serialization for Server Components
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    await connectToDatabase();
    const doc = await CategoryModel.findOne({ slug, is_active: true }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
}
