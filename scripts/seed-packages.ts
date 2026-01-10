
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import Package from '../models/Package';
import { PRICING_PACKAGES } from '../constants';

async function connectDB() {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI missing');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
}

async function seedPackages() {
    await connectDB();
    try {
        console.log('Seeding packages...');

        // Clear existing packages to avoid duplicates or strict upsert
        await Package.deleteMany({});
        console.log('Cleared existing packages');

        for (const pkg of PRICING_PACKAGES) {
            const slug = pkg.title.toLowerCase().replace(/ /g, '-');
            const newPackage = {
                title: pkg.title,
                slug: slug,
                priceDisplay: pkg.priceEstimate,
                shortDescription: pkg.duration,
                description: pkg.description,
                amenities: pkg.includes.map(inc => ({ title: inc })),
                tagline: pkg.bestFor,
                isActive: true,
                images: {
                    hero: pkg.title.toLowerCase().includes('day') ? '/packages/budget.jpg' : '/packages/luxury.webp'
                }
            };

            await Package.create(newPackage);
            console.log(`Created package: ${pkg.title}`);
        }

        // Seed the specific Promo Package required by the Home Page
        await Package.create({
            title: "Signature Kerala Holiday",
            slug: "kerala-package",
            priceDisplay: "₹ 24,500",
            shortDescription: "3 Days / 4 Nights",
            description: "An all-inclusive journey through the heart of Alleppey's backwaters. Experience the full spectrum of Kerala's aquatic life with premium amenities.",
            amenities: ["AC Accommodation", "All Meals", "Sunset Cruise", "Village Walk", "Canoe Ride"].map(inc => ({ title: inc })),
            tagline: "The Ultimate Experience",
            isActive: true, // Schema says camelCase
            images: {
                hero: "/packages/signature.webp"
            }
        });
        console.log('Created package: Kerala Holiday Package');

    } catch (e) {
        console.error('Error seeding packages:', e);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedPackages();
