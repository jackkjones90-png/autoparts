/**
 * ============================================================
 *  HALFORDS PRODUCT SCRAPER
 *  Scrapes product listings from halfords.com
 *  Output: scraper/data/*.json
 * ============================================================
 *
 *  Run with:  pnpm run scrape
 *  or:        pnpm tsx scraper/halfords-scraper.ts
 */

import { chromium, type Page, type Browser } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// ─── Config ──────────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.halfords.com';

/** Categories to scrape. Format: { name, url, maxPages } */
const CATEGORIES = [
  {
    name: 'Car Cleaning',
    url: 'https://www.halfords.com/motoring/car-cleaning/',
    maxPages: 3,
  },
  {
    name: 'Car Parts',
    url: 'https://www.halfords.com/motoring/car-parts/',
    maxPages: 3,
  },
  {
    name: 'Oils & Fluids',
    url: 'https://www.halfords.com/motoring/oils-and-fluids/',
    maxPages: 3,
  },
  {
    name: 'Tools',
    url: 'https://www.halfords.com/tools/',
    maxPages: 3,
  },
  {
    name: 'Bikes',
    url: 'https://www.halfords.com/bikes/',
    maxPages: 3,
  },
  {
    name: 'Cycling Accessories',
    url: 'https://www.halfords.com/cycling/cycling-accessories/',
    maxPages: 2,
  },
  {
    name: 'Dash Cams',
    url: 'https://www.halfords.com/motoring/dash-cams/',
    maxPages: 2,
  },
  {
    name: 'Sat Nav',
    url: 'https://www.halfords.com/motoring/gps-and-sat-nav/',
    maxPages: 2,
  },
];

const OUTPUT_DIR = path.join(process.cwd(), 'scraper', 'data');
const DELAY_BETWEEN_PAGES_MS = 2000;
const DELAY_BETWEEN_CATEGORIES_MS = 3000;
const PAGE_LOAD_TIMEOUT = 45000;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  price: number | null;
  originalPrice: number | null;
  discountPercent: number | null;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  imageUrl: string | null;
  productUrl: string;
  brand: string | null;
  category: string;
  inStock: boolean;
  badge: string | null;
  scrapedAt: string;
}

interface ScraperResult {
  category: string;
  totalProducts: number;
  pagesScraped: number;
  scrapedAt: string;
  products: Product[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

function parsePrice(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[£$€,\s]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function log(msg: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') {
  const symbols = { info: '→', success: '✓', warn: '⚠', error: '✗' };
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m',
  };
  const reset = '\x1b[0m';
  const ts = new Date().toLocaleTimeString();
  console.log(`${colors[type]}[${ts}] ${symbols[type]} ${msg}${reset}`);
}

// ─── Page-level scraping ──────────────────────────────────────────────────────

async function scrapePage(
  page: Page,
  url: string,
  category: string
): Promise<Product[]> {
  log(`  Loading: ${url}`);

  try {
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: PAGE_LOAD_TIMEOUT,
    });
  } catch (err) {
    log(`  Failed to load page: ${url}`, 'error');
    return [];
  }

  // Wait for product cards to appear
  try {
    await page.waitForSelector(
      [
        '[data-testid="product-card"]',
        '.product-card',
        '[class*="product-card"]',
        '[class*="ProductCard"]',
        '.plp-product-card',
        '[data-product-id]',
        'article[class*="product"]',
      ].join(', '),
      { timeout: 15000 }
    );
  } catch {
    log('  No product cards found with standard selectors, trying fallback...', 'warn');
  }

  // Extra wait for lazy-loaded content
  await delay(2000);

  // Scroll to bottom to trigger lazy loading
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
  await delay(1500);
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  await delay(500);

  const products = await page.evaluate(
    ({ category, baseUrl }: { category: string; baseUrl: string }) => {
      const results: Product[] = [];

      // ── Selector strategies ──
      const cardSelectors = [
        '[data-testid="product-card"]',
        '.product-card',
        '[class*="product-card"]',
        '[class*="ProductCard"]',
        '.plp-product-card',
        '[data-product-id]',
        'article[class*="product"]',
        '.boost-pfs-filter-product-item',
        '[class*="product-item"]',
        '[class*="productItem"]',
        '.product',
      ];

      let cards: Element[] = [];
      for (const sel of cardSelectors) {
        const found = Array.from(document.querySelectorAll(sel));
        // Filter out cards that are nested inside another card
        const top = found.filter(
          (el) => !found.some((other) => other !== el && other.contains(el))
        );
        if (top.length > 0) {
          cards = top;
          break;
        }
      }

      if (cards.length === 0) return results;

      const getText = (el: Element | null | undefined): string | null => {
        if (!el) return null;
        return el.textContent?.trim() || null;
      };

      const getAttr = (
        el: Element | null | undefined,
        attr: string
      ): string | null => {
        if (!el) return null;
        return el.getAttribute(attr) || null;
      };

      const now = new Date().toISOString();

      for (const card of cards) {
        // ── Name ──
        const nameEl =
          card.querySelector('[data-testid="product-title"]') ||
          card.querySelector('[class*="product-name"]') ||
          card.querySelector('[class*="ProductName"]') ||
          card.querySelector('[class*="title"]') ||
          card.querySelector('h2') ||
          card.querySelector('h3') ||
          card.querySelector('a[class*="title"]');
        const name = getText(nameEl);
        if (!name) continue;

        // ── URL ──
        const linkEl =
          card.querySelector('a[href*="/"]') ||
          card.querySelector('a');
        const rawHref = getAttr(linkEl, 'href') || '';
        const productUrl = rawHref.startsWith('http')
          ? rawHref
          : `${baseUrl}${rawHref}`;
        if (!rawHref) continue;

        // ── Price ──
        const priceEl =
          card.querySelector('[data-testid="product-price"]') ||
          card.querySelector('[class*="price"]') ||
          card.querySelector('[class*="Price"]') ||
          card.querySelector('.price') ||
          card.querySelector('[itemprop="price"]');
        const priceText = getText(priceEl);

        // ── Original price (was price) ──
        const wasPriceEl =
          card.querySelector('[class*="was-price"]') ||
          card.querySelector('[class*="WasPrice"]') ||
          card.querySelector('[class*="original-price"]') ||
          card.querySelector('s') ||
          card.querySelector('[class*="strike"]') ||
          card.querySelector('del');
        const wasPriceText = getText(wasPriceEl);

        // ── Image ──
        const imgEl =
          card.querySelector('img[src*="halfords"]') ||
          card.querySelector('img[data-src]') ||
          card.querySelector('img[src]');
        const imageUrl =
          getAttr(imgEl, 'src') ||
          getAttr(imgEl, 'data-src') ||
          getAttr(imgEl, 'data-lazy-src') ||
          null;

        // ── Rating ──
        const ratingEl =
          card.querySelector('[data-testid="star-rating"]') ||
          card.querySelector('[class*="rating"]') ||
          card.querySelector('[class*="Rating"]') ||
          card.querySelector('[aria-label*="out of"]') ||
          card.querySelector('[class*="stars"]');
        const ratingText =
          getAttr(ratingEl, 'aria-label') ||
          getAttr(ratingEl, 'data-rating') ||
          getText(ratingEl);

        // ── Review count ──
        const reviewEl =
          card.querySelector('[data-testid="review-count"]') ||
          card.querySelector('[class*="review-count"]') ||
          card.querySelector('[class*="ReviewCount"]');
        const reviewText = getText(reviewEl);

        // ── Brand ──
        const brandEl =
          card.querySelector('[class*="brand"]') ||
          card.querySelector('[class*="Brand"]') ||
          card.querySelector('[itemprop="brand"]');
        const brand = getText(brandEl);

        // ── Stock ──
        const outOfStock =
          card.querySelector('[class*="out-of-stock"]') ||
          card.querySelector('[class*="OutOfStock"]') ||
          card.textContent?.toLowerCase().includes('out of stock');
        const inStock = !outOfStock;

        // ── Badge (e.g. "Sale", "New", "Best Seller") ──
        const badgeEl =
          card.querySelector('[class*="badge"]') ||
          card.querySelector('[class*="Badge"]') ||
          card.querySelector('[class*="label"]') ||
          card.querySelector('[class*="tag"]');
        const badge = getText(badgeEl);

        // ── Parse prices ──
        const parseP = (txt: string | null) => {
          if (!txt) return null;
          const m = txt.match(/[\d,.]+/);
          if (!m) return null;
          const n = parseFloat(m[0].replace(/,/g, ''));
          return isNaN(n) ? null : n;
        };

        const price = parseP(priceText);
        const originalPrice = parseP(wasPriceText);
        const discountPercent =
          price && originalPrice && originalPrice > price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : null;

        // ── Rating parse ──
        const ratingMatch = ratingText?.match(/([\d.]+)\s*(?:out of|\/)\s*[\d]+/i) ||
          ratingText?.match(/([\d.]+)/);
        const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

        const reviewMatch = reviewText?.match(/([\d,]+)/);
        const reviewCount = reviewMatch
          ? parseInt(reviewMatch[1].replace(/,/g, ''), 10)
          : null;

        // ── Build ID from URL ──
        const id = rawHref.split('/').filter(Boolean).pop() || name;

        results.push({
          id,
          name,
          price,
          originalPrice,
          discountPercent,
          currency: '£',
          rating,
          reviewCount,
          imageUrl,
          productUrl,
          brand: brand || null,
          category,
          inStock,
          badge: badge || null,
          scrapedAt: now,
        });
      }

      return results;
    },
    { category, baseUrl: BASE_URL }
  );

  log(`  Found ${products.length} products`, products.length > 0 ? 'success' : 'warn');
  return products as Product[];
}

// ─── Category scraper ─────────────────────────────────────────────────────────

async function scrapeCategory(
  page: Page,
  category: { name: string; url: string; maxPages: number }
): Promise<ScraperResult> {
  log(`\nScraping category: ${category.name}`, 'info');
  const allProducts: Product[] = [];
  let pagesScraped = 0;

  for (let pageNum = 1; pageNum <= category.maxPages; pageNum++) {
    // Build paginated URL - Halfords uses ?page=N or ?start=N
    const pageUrl =
      pageNum === 1
        ? category.url
        : `${category.url}?page=${pageNum}`;

    const products = await scrapePage(page, pageUrl, category.name);

    if (products.length === 0 && pageNum > 1) {
      log(`  No products on page ${pageNum}, stopping pagination`, 'warn');
      break;
    }

    // Deduplicate by productUrl
    const existingUrls = new Set(allProducts.map((p) => p.productUrl));
    const newProducts = products.filter((p) => !existingUrls.has(p.productUrl));
    allProducts.push(...newProducts);
    pagesScraped = pageNum;

    if (pageNum < category.maxPages) {
      log(`  Waiting before next page...`);
      await delay(DELAY_BETWEEN_PAGES_MS);
    }
  }

  return {
    category: category.name,
    totalProducts: allProducts.length,
    pagesScraped,
    scrapedAt: new Date().toISOString(),
    products: allProducts,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n' + '═'.repeat(60));
  console.log('  🛒  HALFORDS PRODUCT SCRAPER');
  console.log('═'.repeat(60) + '\n');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let browser: Browser | null = null;

  try {
    log('Launching browser...', 'info');
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--window-size=1366,768',
      ],
    });

    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 768 },
      locale: 'en-GB',
      extraHTTPHeaders: {
        'Accept-Language': 'en-GB,en;q=0.9',
      },
    });

    // Block heavy resources to speed up scraping
    await context.route('**/*.{mp4,webm,ogg,flac,wav,mp3}', (route) => route.abort());
    await context.route('**/{analytics,tracking,gtm,hotjar,facebook,twitter}**', (route) =>
      route.abort()
    );

    const page = await context.newPage();

    // Accept cookies on first visit
    log('Visiting homepage to accept cookies...', 'info');
    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await delay(2000);

      // Try to accept cookie consent
      const cookieBtn = page.locator(
        'button:has-text("Accept All"), button:has-text("Accept Cookies"), #onetrust-accept-btn-handler, [id*="cookie"] button'
      ).first();
      if (await cookieBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await cookieBtn.click();
        log('Accepted cookie consent', 'success');
        await delay(1000);
      }
    } catch {
      log('Cookie banner not found or already accepted', 'warn');
    }

    // ── Scrape each category ──
    const allResults: ScraperResult[] = [];
    const summary: Record<string, number> = {};

    for (let i = 0; i < CATEGORIES.length; i++) {
      const cat = CATEGORIES[i];
      const result = await scrapeCategory(page, cat);
      allResults.push(result);
      summary[cat.name] = result.totalProducts;

      // Save per-category file
      const catFileName = `${slugify(cat.name)}.json`;
      const catFilePath = path.join(OUTPUT_DIR, catFileName);
      fs.writeFileSync(catFilePath, JSON.stringify(result, null, 2), 'utf-8');
      log(`  Saved → scraper/data/${catFileName}`, 'success');

      if (i < CATEGORIES.length - 1) {
        log(`  Cooling down before next category...`);
        await delay(DELAY_BETWEEN_CATEGORIES_MS);
      }
    }

    // ── Save combined output ──
    const allProducts = allResults.flatMap((r) => r.products);
    const combined = {
      scrapedAt: new Date().toISOString(),
      totalProducts: allProducts.length,
      categories: allResults.map((r) => ({
        name: r.category,
        count: r.totalProducts,
        pagesScraped: r.pagesScraped,
      })),
      products: allProducts,
    };

    const combinedPath = path.join(OUTPUT_DIR, 'all-products.json');
    fs.writeFileSync(combinedPath, JSON.stringify(combined, null, 2), 'utf-8');

    // ── Print summary ──
    console.log('\n' + '═'.repeat(60));
    console.log('  📊  SCRAPING COMPLETE');
    console.log('═'.repeat(60));
    console.log(`\n  Total products scraped: ${allProducts.length}`);
    console.log('\n  By category:');
    for (const [cat, count] of Object.entries(summary)) {
      const bar = '█'.repeat(Math.min(Math.ceil(count / 2), 30));
      console.log(`    ${cat.padEnd(25)} ${String(count).padStart(4)} ${bar}`);
    }
    console.log(`\n  Output saved to: scraper/data/`);
    console.log('═'.repeat(60) + '\n');
  } catch (err) {
    log(`Fatal error: ${err}`, 'error');
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      log('Browser closed.', 'info');
    }
  }
}

main();
