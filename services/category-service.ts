// services/category-service.ts

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
  type: "category" | "collection" | "priceStrip";
}

interface BackendCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
  type: "category" | "collection" | "priceStrip";
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

// in-memory cache
let categoryCache: Map<string, Category> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 1000 * 60 * 10; // 10 min

const transformCategory = (backend: BackendCategory): Category => ({
  id: backend._id,
  title: backend.title,
  slug: backend.slug,
  description: backend.description,
  thumbnail: backend.thumbnail,
  isActive: backend.isActive,
  type: backend.type,
});

// fetch all active categories from backend
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/product-categories?isActive=true&type=category`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`);
  }

  const json = await res.json();
  const items: BackendCategory[] = json?.data?.items ?? [];

  return items.map(transformCategory);
};


// ensure cache exists and is fresh
const ensureCache = async (): Promise<Map<string, Category>> => {
  const now = Date.now();

  if (categoryCache && now - cacheTimestamp < CACHE_TTL) {
    return categoryCache;
  }

  const categories = await fetchCategories();
  const map = new Map<string, Category>();

  for (const cat of categories) {
    map.set(cat.slug.toLowerCase(), cat);
  }

  categoryCache = map;
  cacheTimestamp = now;
  return map;
};

// get full category object by slug
export const getCategoryBySlug = async (
  slug: string
): Promise<Category | null> => {
  const cache = await ensureCache();
  return cache.get(slug.toLowerCase()) ?? null;
};

// get only categoryId (used by product API)
export const getCategoryIdBySlug = async (
  slug: string
): Promise<string | null> => {
  const cat = await getCategoryBySlug(slug);
  return cat?.id ?? null;
};

// clear cache (useful after admin updates)
export const clearCategoryCache = (): void => {
  categoryCache = null;
  cacheTimestamp = 0;
};
