import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
    slug: string;
    display_name: string;
    base_price: number;
    is_active: boolean;
    name: string;
    seoTitle?: string;
    tagline?: string;
    shortPitch?: string;
    description?: string;
    secondaryDescription?: string;

    // Arrays & Objects
    amenitiesList?: any[];
    audience?: string[];
    badges?: string[];
    bookingInfo?: any;
    crew?: any;
    deck?: any;
    dining?: any;
    duration?: string;
    faqs?: any[];
    features?: string[];
    gallery?: any[];
    guestCapacity?: string;
    highlights?: string[];
    imagePlaceholder?: string;
    journeyFlow?: any[];
    pricing?: any;
    reviews?: any[];
    scenicRoutes?: any[];
    startingPoint?: any;
    stats?: any;
    trustSignals?: string[];
}

const CategorySchema: Schema = new Schema({
    slug: { type: String, required: true, unique: true },
    display_name: { type: String, required: true },
    base_price: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
    name: { type: String, required: true },

    // Detailed fields
    seoTitle: String,
    tagline: String,
    shortPitch: String,
    description: String,
    secondaryDescription: String,
    duration: String,
    guestCapacity: String,
    imagePlaceholder: String,

    amenitiesList: [Schema.Types.Mixed],
    audience: [String],
    badges: [String],
    bookingInfo: Schema.Types.Mixed,
    crew: Schema.Types.Mixed,
    deck: Schema.Types.Mixed,
    dining: Schema.Types.Mixed,
    faqs: [Schema.Types.Mixed],
    features: [String],
    gallery: [Schema.Types.Mixed],
    highlights: [String],
    journeyFlow: [Schema.Types.Mixed],
    pricing: Schema.Types.Mixed,
    reviews: [Schema.Types.Mixed],
    scenicRoutes: [Schema.Types.Mixed],
    startingPoint: Schema.Types.Mixed,
    stats: Schema.Types.Mixed,
    trustSignals: [String]
}, {
    timestamps: true,
    strict: false // Allow flexibility since the JSON has many nested fields
});

// Prevent overwrite on hot reload
const Category: Model<ICategory> = mongoose.models?.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
