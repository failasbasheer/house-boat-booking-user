
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGO_URI environment variable inside .env.local');
    process.exit(1);
}

const SettingsSchema = new mongoose.Schema({
    id: { type: String, default: 'global_settings', unique: true },
    whatsappNumber: { type: String, required: true },
    whatsappMessage: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
}, { strict: false });

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

async function seedSettings() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to database.');

        const defaultSettings = {
            id: 'global_settings',
            whatsappNumber: "916282118829",
            whatsappMessage: "Hi, I'm interested in checking availability for a houseboat experience.",
            contactPhone: "+91 62821 18829",
            contactEmail: "hello@alleppeyhouseboats.com"
        };

        await Settings.findOneAndUpdate(
            { id: 'global_settings' },
            defaultSettings,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log('Settings seeded successfully.');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding settings:', error);
        process.exit(1);
    }
}

seedSettings();
