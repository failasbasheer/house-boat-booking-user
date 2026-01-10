
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET() {
    try {
        await connectDB();
        const settings = await Settings.findOne({ id: 'global_settings' });

        if (!settings) {
            return NextResponse.json(
                {
                    whatsappNumber: "916282118829",
                    whatsappMessage: "Hi, I'm interested in checking availability for a houseboat experience.",
                    contactPhone: "+91 62821 18829",
                    contactEmail: "hello@alleppeyhouseboats.com"
                },
                { status: 200 }
            );
        }

        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}
