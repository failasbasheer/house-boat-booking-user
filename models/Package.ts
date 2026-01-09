import mongoose, { Document, Model } from 'mongoose';

export interface IPackage extends Document {
    slug: string;
    title: string;
    tagline?: string;
    description?: string;
    shortDescription?: string;
    priceDisplay?: string;
    guestCapacity?: string;
    amenities?: {
        icon?: string;
        title?: string;
        description?: string;
    }[];
    images: {
        hero: string;
        gallery?: string[];
    };
    itinerary?: {
        day?: number;
        title?: string;
        description?: string;
    }[];
    whatsappTemplate?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const packageSchema = new mongoose.Schema<IPackage>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: String,
    description: String,
    shortDescription: String,
    priceDisplay: String,
    guestCapacity: String,
    amenities: [{
        icon: String,
        title: String,
        description: String
    }],
    images: {
        hero: { type: String, required: true }, // S3 URL
        gallery: [String]
    },
    itinerary: [{
        day: Number,
        title: String,
        description: String
    }],
    whatsappTemplate: String,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Package: Model<IPackage> = mongoose.models.Package || mongoose.model<IPackage>('Package', packageSchema);
export default Package;

