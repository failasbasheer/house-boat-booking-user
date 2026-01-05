import connectDB from './db';
import CategoryModel, { ICategory } from '@/models/Category';
import HouseboatModel from '@/models/Houseboat';
import { Category } from '@/types';
import { getImageUrl } from '@/lib/utils';

// Helper to map DB document to Frontend Interface
const mapDBCategoryToFrontend = (doc: ICategory, boatCount: number = 0): Category => {
    const plain = doc.toObject ? doc.toObject() : doc;

    return {
        id: plain._id.toString(),
        slug: plain.slug,
        title: plain.display_name || plain.name,
        tagline: plain.tagline || '',
        description: plain.description || '',
        shortDescription: plain.secondaryDescription || plain.description || '',
        guestCapacity: plain.guestCapacity || '2 - 6 Guests',
        amenities: (plain.amenitiesList || []).map((a: any) => ({
            icon: a.icon || 'Star', // Fallback icon
            title: a.title || '',
            description: a.desc || a.description || ''
        })),
        stats: {
            totalBoats: boatCount || plain.stats?.totalBoats || 0,
            rating: plain.stats?.rating || 4.8
        },
        heroImage: plain.imagePlaceholder
            ? getImageUrl(plain.imagePlaceholder, 'category')
            : `/packages/${plain.slug}.webp`,
        testimonials: (plain.reviews || []).map((r: any, index: number) => ({
            id: index,
            text: r.text || '',
            author: r.name || 'Guest',
            location: r.location || ''
        })),
        whatsappTemplate: `Hi, I am interested in booking a ${plain.display_name || plain.name}.`
    };
};

export async function getAllCategories(): Promise<Category[]> {
    await connectDB();
    // Fetch all active categories
    const categories = await CategoryModel.find({ is_active: true }).lean();

    // Aggregate boat counts for all categories
    const boatCounts = await HouseboatModel.aggregate([
        { $group: { _id: '$category_id', count: { $sum: 1 } } }
    ]);

    // Create a map for quick lookup: category_id (string) -> count
    const countMap = new Map<string, number>();
    boatCounts.forEach((item: any) => {
        if (item._id) countMap.set(item._id.toString(), item.count);
    });

    // Sort manually
    const order = ['deluxe', 'premium', 'luxury', 'romantic', 'shared-tours'];
    categories.sort((a, b) => {
        const indexA = order.indexOf(a.slug);
        const indexB = order.indexOf(b.slug);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return categories.map(cat => {
        const count = countMap.get((cat as any)._id.toString()) || 0;
        return mapDBCategoryToFrontend(cat as unknown as ICategory, count);
    });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    await connectDB();
    const category = await CategoryModel.findOne({ slug, is_active: true }).lean();

    if (!category) return null;

    // Count boats for this category
    const count = await HouseboatModel.countDocuments({ category_id: category._id });

    return mapDBCategoryToFrontend(category as unknown as ICategory, count);
}
