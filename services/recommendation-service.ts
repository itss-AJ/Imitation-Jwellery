import { getDeviceId } from "@/lib/device-storage";

export interface RecommendedProduct {
  id: string;
  title: string;
  price: string;
  priceNumber: number;
  image: string;
  reason?: string;
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

export const fetchRecommendations = async (
  productId?: string,
  limit = 6
): Promise<RecommendedProduct[]> => {
  const params = new URLSearchParams({ limit: String(limit) });
  if (productId) params.append("productId", productId);

  const url = `${API_BASE_URL}/api/v1/recommendations?${params}`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const items = data?.data?.items ?? data?.items ?? [];

    return items.map((p: any) => ({
      id: p._id,
      title: p.name,
      price: `Rs. ${p.price?.toLocaleString("en-IN") || "0"}`,
      priceNumber: p.price || 0,
      image: p.thumbnail || p.images?.[0] || "/img/placeholder.webp",
      reason: p.reason,
    }));
  } catch {
    return [];
  }
};

export const fetchSimilarProducts = async (
  productId: string,
  limit = 4
): Promise<RecommendedProduct[]> => {
  const url = `${API_BASE_URL}/api/v1/products/${productId}/similar?limit=${limit}`;

  try {
    const response = await fetch(url, { headers: buildHeaders() });

    if (!response.ok) return [];

    const data = await response.json();
    const items = data?.data?.items ?? data?.items ?? [];

    return items.map((p: any) => ({
      id: p._id,
      title: p.name,
      price: `Rs. ${p.price?.toLocaleString("en-IN") || "0"}`,
      priceNumber: p.price || 0,
      image: p.thumbnail || p.images?.[0] || "/img/placeholder.webp",
    }));
  } catch {
    return [];
  }
};

export const trackProductView = async (productId: string): Promise<void> => {
  const deviceId = getDeviceId();
  const url = `${API_BASE_URL}/api/v1/recommendation-events`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { ...buildHeaders(), "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        deviceId,
        productId,
        eventType: "view",
      }),
    });
  } catch {
    // ignore
  }
};
