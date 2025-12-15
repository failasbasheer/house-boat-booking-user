import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                display: ['"Cinzel"', 'serif'],
            },
            colors: {
                ivory: {
                    50: '#FDFCFB', // Main Page BG (Warm White)
                    100: '#F5F2F0', // Secondary Section BG
                    200: '#EBE6E3', // Borders
                    300: '#D6CEC9',
                },
                forest: {
                    950: '#051A14', // Primary Headings (Very Dark Green)
                    900: '#0A261F',
                    800: '#143D32', // Buttons/Accents
                    700: '#1F5749',
                    50: '#EFFDF9',
                },
                espresso: {
                    900: '#2C2420', // Body Text (Warm Black)
                    800: '#453934',
                    500: '#8A7A70', // Muted Text
                },
                bronze: {
                    400: '#CBB082',
                    500: '#B08D55', // Icons/Highlights
                    600: '#8C6B3D',
                }
            },
            boxShadow: {
                'soft': '0 20px 40px -10px rgba(44, 36, 32, 0.05)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 10px 30px -10px rgba(0,0,0,0.08)',
                'glow': '0 0 20px rgba(176, 141, 85, 0.15)',
            },
            backgroundImage: {
                'gradient-fade': 'linear-gradient(to bottom, rgba(253,252,251,0) 0%, #FDFCFB 100%)',
            }
        },
    },
    plugins: [],
};
export default config;
