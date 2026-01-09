/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
            },
            {
                protocol: 'https',
                hostname: 'house-boat-booking-admin-backend.onrender.com',
            },
            {
                protocol: 'https',
                hostname: 'houseboat-booking.s3.ap-south-1.amazonaws.com',
            }
        ],
    },
};

export default nextConfig;
