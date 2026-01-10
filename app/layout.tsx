import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from '@/context/SettingsContext';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
});

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
});

export const metadata: Metadata = {
    title: "The Backwaters | Luxury Houseboat Experiences",
    description: "Experience the silent luxury of Alleppey. Premium houseboats for discerning travelers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${cinzel.variable} font-sans bg-white text-espresso-900 antialiased overflow-x-hidden selection:bg-forest-800 selection:text-white`}>
                <SettingsProvider>
                    {children}
                </SettingsProvider>
            </body>
        </html>
    );
}
