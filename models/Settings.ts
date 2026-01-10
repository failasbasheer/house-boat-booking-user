
import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    id: { type: String, default: 'global_settings', unique: true }, // Singleton pattern
    whatsappNumber: { type: String, required: true },
    whatsappMessage: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
}, { strict: false });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
