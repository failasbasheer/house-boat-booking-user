export const getImageUrl = (url: string, subfolder: string = 'houseboats') => {
    if (!url) return '';
    const filename = url.split('/').pop();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    return `${backendUrl}/uploads/${subfolder}/${filename}`;
};

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};
