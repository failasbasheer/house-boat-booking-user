import { Boat } from '@/types';

export const fetchHouseboats = async (): Promise<Boat[]> => {
    try {
        const response = await fetch('/api/houseboats');
        if (!response.ok) {
            throw new Error(`Failed to fetch houseboats: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<any[]> => {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
            console.warn(`Failed to fetch categories: ${response.statusText}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Category API Error:', error);
        return [];
    }
};
