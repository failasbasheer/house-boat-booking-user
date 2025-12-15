import { NextResponse } from 'next/server';

// WhatsApp Configuration
const WHATSAPP_NUMBER = "971524397927";

// Helper to construct WhatsApp URL
const createWhatsAppLink = (number: string, text: string) => {
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, guests, type, duration } = body;

        // Construct the formatted message
        const message = `Hi, I'm checking availability for a houseboat in Alleppey.
    
📝 *Trip Details*
📅 Date: ${date || 'Flexible'}
👥 Guests: ${guests}
🛥️ Preference: ${type}
⏳ Duration: ${duration}

Please verify availability and share the seasonal rates.`;

        const redirectUrl = createWhatsAppLink(WHATSAPP_NUMBER, message);

        // Return the redirect URL to the frontend
        return NextResponse.json({ success: true, redirectUrl });

    } catch (error) {
        console.error('Booking Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
