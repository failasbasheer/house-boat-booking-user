import mongoose from 'mongoose';

const houseboatSchema = new mongoose.Schema({
    // Core Identity
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },

    // Link to Category Config (NOT hardcoded enum)
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

    // Operational Status
    status: { type: String, enum: ['active', 'maintenance', 'decommissioned'], default: 'active' },

    // Inventory Specs
    bedrooms: { type: Number, required: true, default: 1 },
    capacity_adults: { type: Number, required: true, default: 2 },
    capacity_children: { type: Number, default: 0 },
    has_ac: { type: Boolean, default: true },
    cruise_hours: { type: Number, default: 22 },

    // Pricing Override (Optional - defaults to Category price)
    price_override: { type: Number },
    priceDisplay: { type: String },
    shared_package_availability: { type: Boolean, default: false },

    // Visuals (Keep existing structure but simplify validation if needed)
    images: {
        hero: { type: String, required: true },
        exterior: String,
        interior: String,
        bedroom: String,
        dining: String,
        bathroom: String,
        extra1: String,
        extra2: String,
        extra3: String,
        gallery: [String] // Allow unlimited additional images
    },

    // Metadata for Admin Internal Use
    notes: String,

    // Master Data References (Keep as they might define features of specific boat)
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],

    // RICH MARKETING CONTENT
    tagline: String,
    shortPitch: String,
    description: String,
    secondaryDescription: String,
    badges: [String], // "Premium Class", "Butler Service" etc.

    // RICH FEATURES
    crew: {
        size: { type: Number, default: 3 },
        roles: [String] // "Captain", "Chef" etc.
    },

    dining: {
        cuisineTypes: [String],
        isPrivate: { type: Boolean, default: false },
        wineSommelier: Boolean
    },

    deck: {
        type: { type: String, default: 'Upper Deck' }, // "Sun Deck", "Infinity Pool"
        seating: String
    },

    // JOURNEY / POLICIES
    journeyFlow: [String], // Array of strings describing the timeline
    scenicRoutes: [{
        name: String,
        duration: String,
        highlights: String
    }],


}, { timestamps: true });

// Prevent recompilation error in Next.js
export const Houseboat = mongoose.models.Houseboat || mongoose.model('Houseboat', houseboatSchema);
export default Houseboat;
