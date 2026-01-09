import { Boat } from '@/types';

export const fetchHouseboats = async (): Promise<Boat[]> => {
    try {
        const response = await fetch('/api/public/houseboats');
        if (!response.ok) throw new Error('Failed to fetch houseboats');
        const json = await response.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error('API client error:', error);
        return [];
    }
};

export const fetchCategories = async (): Promise<any[]> => {
    try {
        const response = await fetch('/api/public/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const json = await response.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error('API client error:', error);
        return [];
    }
};
