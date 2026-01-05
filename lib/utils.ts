export const getImageUrl = (url: string, subfolder: string = 'houseboats') => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('https')) return url;
    if (url.startsWith('/')) return url;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    // Clean up the URL construction
    return `${backendUrl}/uploads/${subfolder}/${url}`;
};

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};
