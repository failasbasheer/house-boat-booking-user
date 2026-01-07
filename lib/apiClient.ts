import { Boat } from '@/types';
import { BOATS, CATEGORIES } from '@/lib/data';

export const fetchHouseboats = async (): Promise<Boat[]> => {
    // Return static data immediately
    return Promise.resolve(BOATS);
};

export const fetchCategories = async (): Promise<any[]> => {
    // Return static data immediately
    return Promise.resolve(CATEGORIES);
};
