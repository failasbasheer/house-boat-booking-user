import { getAllCategories } from '@/lib/categories';
import FleetListing from '@/components/FleetListing';

export default async function FleetPage() {
    const categories = await getAllCategories();

    return (
        <FleetListing categories={categories} />
    );
}
