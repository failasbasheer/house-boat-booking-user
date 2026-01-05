export const getImageUrl = (url: string, subfolder: string = 'houseboats') => {
    if (!url) return '';

    // 1. Absolute URLs - return as is
    if (url.startsWith('http') || url.startsWith('https')) return url;

    // 2. Frontend Assets - whitelist specific folders that exist in public/
    // These should be served relative to the frontend domain
    if (url.startsWith('/packages') || url.startsWith('/collection') || url.startsWith('/images') || url.startsWith('/logo')) {
        return url;
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    // 3. Backend Uploads - if it contains /uploads/, it belongs to the backend
    if (url.includes('/uploads/')) {
        // Ensure we don't double-slash or double-prepend if the DB value is messy
        // If it starts with /, strip it to append clean to backendUrl (which might have no trailing slash)
        // actually backendUrl usually doesn't have trailing slash.
        const cleanPath = url.startsWith('/') ? url : `/${url}`;
        return `${backendUrl}${cleanPath}`;
    }

    // 4. Filename only - construct the full backend path
    // If it's just "image.jpg", assume it goes into the specified subfolder
    return `${backendUrl}/uploads/${subfolder}/${url}`;
};

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};
