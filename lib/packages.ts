
import { IPackage } from '@/models/Package';
import connectToDatabase from '@/lib/db';
import PackageModel from '@/models/Package';

export async function getAllPackages(): Promise<IPackage[]> {
    await connectToDatabase();
    const docs = await PackageModel.find({ isActive: true }).lean();
    return JSON.parse(JSON.stringify(docs));
}

export async function getPackageBySlug(slug: string): Promise<IPackage | null> {
    await connectToDatabase();
    const doc = await PackageModel.findOne({ slug, isActive: true }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getHighlightedPackages(limit: number = 4): Promise<IPackage[]> {
    await connectToDatabase();
    const docs = await PackageModel.find({ isActive: true })
        .limit(limit)
        .lean();
    return JSON.parse(JSON.stringify(docs));
}

export async function getHeroPackage(): Promise<IPackage | null> {
    await connectToDatabase();
    const doc = await PackageModel.findOne({ isActive: true, isHero: true })
        .sort({ updatedAt: -1 })
        .lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
}
