
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Check if model already exists to prevent overwrite on hot reload
export const Feature = mongoose.models.Feature || mongoose.model('Feature', featureSchema);
export default Feature;
