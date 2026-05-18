import fs from 'fs';
import path from 'path';

const SCRAPED_DATA_DIR = 'd:/MJR o/halfords/scraped_data';
const OUTPUT_FILE = 'd:/MJR o/halfords/lib/data/products.ts';

interface ScrapedProduct {
  title: string;
  code: string;
  priceInc: string;
  imageUrl: string;
  url: string;
  inStock: boolean;
  description: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  subcategory: string;
  description: string;
  inStock: boolean;
  discount?: number;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.json')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allProducts: Product[] = [];
const categoryMap = new Map<string, string>();

const files = getAllFiles(SCRAPED_DATA_DIR);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const products: ScrapedProduct[] = JSON.parse(content);
  
  const relativePath = path.relative(SCRAPED_DATA_DIR, file);
  const parts = relativePath.split(path.sep);
  const categoryName = parts[0];
  const subcategoryName = path.basename(file, '.json');
  
  const categoryId = categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  categoryMap.set(categoryId, categoryName);

  products.forEach((p, index) => {
    const price = parseFloat(p.priceInc) || 0;
    // Generate a random original price slightly higher for some products to show discounts
    const hasDiscount = Math.random() > 0.7;
    const originalPrice = hasDiscount ? parseFloat((price * (1 + Math.random() * 0.3)).toFixed(2)) : undefined;
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined;

    allProducts.push({
      id: `${categoryId}-${subcategoryName}-${p.code || index}`,
      name: p.title,
      price: price,
      originalPrice: originalPrice,
      image: p.imageUrl,
      rating: parseFloat((4 + Math.random()).toFixed(1)), // Rating between 4.0 and 5.0
      reviewCount: Math.floor(Math.random() * 500) + 10,
      category: categoryId,
      subcategory: subcategoryName.replace(/-/g, ' '),
      description: p.description || p.title,
      inStock: p.inStock,
      discount: discount
    });
  });
});

const categoriesArray = Array.from(categoryMap.entries()).map(([id, name]) => {
    let icon = '📦';
    if (id.includes('part')) icon = '🔧';
    if (id.includes('abrasive')) icon = '🧱';
    if (id.includes('adhesive')) icon = '🧪';
    if (id.includes('storage')) icon = '🗃️';
    return { id, name, icon };
});

const tsContent = `export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  subcategory: string
  description: string
  inStock: boolean
  discount?: number
}

export const products: Product[] = ${JSON.stringify(allProducts, null, 2)}

export const categories = ${JSON.stringify(categoriesArray, null, 2)}
`;

fs.writeFileSync(OUTPUT_FILE, tsContent);
console.log(`Processed ${allProducts.length} products into ${OUTPUT_FILE}`);
