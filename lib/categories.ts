
import { Category } from '@/types';
import { CATEGORIES } from '@/lib/data';

export async function getAllCategories(): Promise<Category[]> {
    return Promise.resolve(CATEGORIES);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = CATEGORIES.find(c => c.slug === slug);
    return Promise.resolve(category || null);
}
