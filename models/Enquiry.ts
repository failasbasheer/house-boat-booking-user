import mongoose, { Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
    name: string;
    phone: string;
    date: Date;
    guests: string;
    category: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const enquirySchema = new mongoose.Schema<IEnquiry>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    guests: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: 'new' }, // new, contacted, booked
}, { timestamps: true });

export const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', enquirySchema);
export default Enquiry;
