import mongoose, { Document, Model } from 'mongoose';

export interface IPromotion extends Document {
    title: string;
    description: string;
    image: string;
    code?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const promotionSchema = new mongoose.Schema<IPromotion>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // S3 URL
    code: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Promotion: Model<IPromotion> = mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', promotionSchema);
export default Promotion;
