export interface Product {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  image: string;

  // extra fields for robust UI filtering/sorting
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
  // NOTE: sorting is handled client-side (backend doesn’t support sort)
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
  sku: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  thumbnail: string;
  price: number;
  mrp: number;
  currency: string;
  stockQty: number;
  isActive: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  tags?: string[];
  createdAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const formatPrice = (price: number): string => {
  return `Rs. ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const transformProduct = (backendProduct: BackendProduct): Product => {
  const priceNumber = Number(backendProduct.price) || 0;
  const createdAtMs = backendProduct.createdAt
    ? new Date(backendProduct.createdAt).getTime()
    : 0;

  const product: Product = {
    id: backendProduct._id,
    title: backendProduct.name,
    price: formatPrice(priceNumber),
    image:
      backendProduct.thumbnail ||
      backendProduct.images?.[0] ||
      "/img/placeholder.webp",
    priceNumber,
    createdAtMs,
    isNewArrival: !!backendProduct.isNewArrival,
    isBestSeller: !!backendProduct.isBestSeller,
    stockQty: Number(backendProduct.stockQty) || 0,
  };

  if (backendProduct.mrp && backendProduct.mrp > priceNumber) {
    product.oldPrice = formatPrice(backendProduct.mrp);
  }
  if (backendProduct.isNewArrival) {
    product.tag = { label: "New Arrival", variant: "primary" };
  } else if (backendProduct.isBestSeller) {
    product.tag = { label: "Best Seller", variant: "secondary" };
  }
  return product;
};

export const fetchProducts = async (
  filters: ProductFilters = {}
): Promise<ProductListResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", String(filters.search));
  if (filters.categoryId) {
    const ids = Array.isArray(filters.categoryId)
      ? filters.categoryId.join(",")
      : String(filters.categoryId);
    params.append("categoryId", ids);
  }
  if (filters.minPrice !== undefined)
    params.append("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.append("maxPrice", String(filters.maxPrice));
  if (filters.isNewArrival !== undefined)
    params.append("isNewArrival", String(filters.isNewArrival));
  if (filters.isBestSeller !== undefined)
    params.append("isBestSeller", String(filters.isBestSeller));
  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));

  const url = `${API_BASE_URL}/api/v1/products${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`
    );
  }

  const responseData = await response.json();

  let backendProducts: BackendProduct[] = [];
  let pagination = {
    page: filters.page || 1,
    limit: filters.limit || 20,
    total: 0,
  };

  if (responseData.data?.items && Array.isArray(responseData.data.items)) {
    backendProducts = responseData.data.items;
    pagination = responseData.data.pagination || pagination;
  } else if (responseData.data && Array.isArray(responseData.data)) {
    backendProducts = responseData.data;
  } else if (responseData.items && Array.isArray(responseData.items)) {
    backendProducts = responseData.items;
    pagination = responseData.pagination || pagination;
  } else if (Array.isArray(responseData)) {
    backendProducts = responseData;
  }

  const products = backendProducts.map(transformProduct);
  return {
    data: products,
    meta: {
      totalItems: pagination.total || products.length,
      totalPages: Math.ceil(
        (pagination.total || products.length) / (pagination.limit || 20)
      ),
      currentPage: pagination.page || 1,
    },
  };
};
