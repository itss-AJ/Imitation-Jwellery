import { getDeviceId } from "@/lib/device-storage";

export interface Product {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  priceNumber: number;
  createdAtMs: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  stockQty: number;
  tag?: {
    label: string;
    variant: "primary" | "secondary";
  };
}

export interface ProductListResponse {
  data: Product[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ProductFilters {
  search?: string;
  categoryId?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  page?: number;
  limit?: number;
}

interface BackendProduct {
  _id: string;
  name: string;
  images?: string[];
  thumbnail?: string;
  price: number;
  mrp?: number;
  stockQty: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  createdAt?: string;
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

const formatPrice = (price: number): string =>
  `Rs. ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const transformProduct = (p: BackendProduct): Product => {
  const priceNumber = Number(p.price) || 0;

  const image =
    p.thumbnail ||
    (p.images && p.images.length > 0 ? p.images[0] : "/img/placeholder.webp");

  const product: Product = {
    id: p._id,
    title: p.name,
    price: formatPrice(priceNumber),
    image,
    priceNumber,
    createdAtMs: p.createdAt ? new Date(p.createdAt).getTime() : 0,
    isNewArrival: Boolean(p.isNewArrival),
    isBestSeller: Boolean(p.isBestSeller),
    stockQty: Number(p.stockQty) || 0,
  };

  if (p.mrp && p.mrp > priceNumber) {
    product.oldPrice = formatPrice(p.mrp);
  }

  if (p.isNewArrival) {
    product.tag = { label: "New Arrival", variant: "primary" };
  } else if (p.isBestSeller) {
    product.tag = { label: "Best Seller", variant: "secondary" };
  }

  return product;
};

export const fetchProducts = async (
  filters: ProductFilters = {}
): Promise<ProductListResponse> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      params.append(key, value.join(","));
    } else {
      params.append(key, String(value));
    }
  });

  if (!params.has("page")) params.append("page", "1");
  if (!params.has("limit")) params.append("limit", "20");

  const url = `${API_BASE_URL}/api/v1/products?${params.toString()}`;

  const res = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  const json = await res.json();

  const items: BackendProduct[] = json?.data?.items ?? [];
  const pagination = json?.data?.pagination;

  const totalItems = pagination?.total ?? items.length;
  const limit = pagination?.limit ?? 20;
  const page = pagination?.page ?? 1;

  return {
    data: items.map(transformProduct),
    meta: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    },
  };
};

export const fetchNewArrivals = async (
  limit = 10
): Promise<Product[]> => {
  const response = await fetchProducts({ isNewArrival: true, limit });
  return response.data;
};

export const fetchBestSellers = async (
  limit = 10
): Promise<Product[]> => {
  const response = await fetchProducts({ isBestSeller: true, limit });
  return response.data;
};

export const searchProducts = async (
  query: string,
  limit = 20
): Promise<Product[]> => {
  const response = await fetchProducts({ search: query, limit });
  return response.data;
};
