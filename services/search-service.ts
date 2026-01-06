import { getDeviceId } from "@/lib/device-storage";

export interface SearchResult {
  id: string;
  title: string;
  price: string;
  priceNumber: number;
  image: string;
  type: "product" | "category" | "collection";
}

export interface SearchResponse {
  products: SearchResult[];
  categories: { id: string; title: string; slug: string }[];
  totalResults: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const buildHeaders = (): HeadersInit => {
  const headers: HeadersInit = {};
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    headers["X-Device-Id"] = deviceId;
  }
  return headers;
};

export const searchProducts = async (
  query: string,
  limit = 10
): Promise<SearchResult[]> => {
  if (!query.trim()) return [];

  const url = `${API_BASE_URL}/api/v1/products?search=${encodeURIComponent(query)}&limit=${limit}`;

  try {
    const response = await fetch(url, { headers: buildHeaders() });

    if (!response.ok) return [];

    const data = await response.json();
    const items = data?.data?.items ?? [];

    return items.map((p: any) => ({
      id: p._id,
      title: p.name,
      price: `Rs. ${p.price?.toLocaleString("en-IN") || "0"}`,
      priceNumber: p.price || 0,
      image: p.thumbnail || p.images?.[0] || "/img/placeholder.webp",
      type: "product" as const,
    }));
  } catch {
    return [];
  }
};

export const searchAll = async (query: string): Promise<SearchResponse> => {
  const products = await searchProducts(query, 10);
  return {
    products,
    categories: [],
    totalResults: products.length,
  };
};
