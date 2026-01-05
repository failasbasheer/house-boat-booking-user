
import fs from 'fs';
import path from 'path';

async function main() {
    // Load .env.local manually
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (e) {
        console.warn('Could not load .env.local', e);
    }

    const { getAllCategories } = await import('./lib/categories');
    const { default: connectDB } = await import('./lib/db');
    const { default: Houseboat } = await import('./models/Houseboat');

    try {
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected.');

        console.log('--- Categories ---');
        const categories = await getAllCategories();
        // Log raw values before frontend mapping if possible, but getAllCategories maps it.
        // We'll trust the mapped output for now, but better to check raw model if possible.
        const { default: CategoryModel } = await import('./models/Category');
        const rawCats = await CategoryModel.find({}).lean();
        rawCats.forEach((c: any) => {
            console.log(`Slug: ${c.slug}, Raw ImagePlaceholder: '${c.imagePlaceholder}'`);
        });

        console.log('\n--- Houseboats ---');
        const boats = await Houseboat.find({}).lean();
        boats.slice(0, 5).forEach((b: any) => {
            console.log(`Name: ${b.name}, Raw Hero: '${b.images.hero}'`);
            if (b.images.gallery) console.log(`Gallery:`, b.images.gallery);
        });

    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}

main();
