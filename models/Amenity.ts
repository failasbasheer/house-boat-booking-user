
import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: String // Optional
});

// Check if model already exists to prevent overwrite on hot reload
export const Amenity = mongoose.models.Amenity || mongoose.model('Amenity', amenitySchema);
export default Amenity;
