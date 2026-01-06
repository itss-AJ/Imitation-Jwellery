import { getDeviceId, getLocal, setLocal } from "@/lib/device-storage";

export type WishlistItem = {
  id: string;
  productId: string;
  title: string;
  price: string;
  image: string;
};

export type Wishlist = {
  items: WishlistItem[];
};

export type ProductLike = {
  productId: string;
  title: string;
  price: string;
  image: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const storageKey = () => `wishlist:${getDeviceId()}`;

const buildHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    headers["X-Device-Id"] = deviceId;
  }
  return headers;
};

const getLocalWishlist = (): Wishlist => {
  return getLocal<Wishlist>(storageKey(), { items: [] });
};

const saveLocalWishlist = (wishlist: Wishlist): void => {
  setLocal(storageKey(), wishlist);
};

// Get wishlist - try backend first, fallback to local
export const getWishlist = async (): Promise<Wishlist> => {
  const deviceId = getDeviceId();

  if (!deviceId || deviceId === "server") {
    return getLocalWishlist();
  }

  try {
    const url = `${API_BASE_URL}/api/v1/wishlist`;
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) {
      return getLocalWishlist();
    }

    const data = await response.json();
    const backendWishlist = data?.data?.wishlist ?? data?.data ?? data?.wishlist;

    if (backendWishlist?.items && Array.isArray(backendWishlist.items)) {
      const wishlist: Wishlist = {
        items: backendWishlist.items.map(
          (item: { _id?: string; productId?: string; product?: { _id: string; name: string; price: number; thumbnail?: string } }) => ({
            id: item._id || item.productId || "",
            productId: item.product?._id || item.productId || "",
            title: item.product?.name || "",
            price: item.product?.price ? `Rs. ${item.product.price}` : "",
            image: item.product?.thumbnail || "/img/placeholder.webp",
          })
        ),
      };
      saveLocalWishlist(wishlist);
      return wishlist;
    }

    return getLocalWishlist();
  } catch {
    return getLocalWishlist();
  }
};

// Add to wishlist
export const addWishlistItem = async (
  product: ProductLike
): Promise<Wishlist> => {
  const wishlist = getLocalWishlist();
  const exists = wishlist.items.some((i) => i.productId === product.productId);

  if (!exists) {
    wishlist.items.push({
      id: product.productId,
      productId: product.productId,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    saveLocalWishlist(wishlist);
  }

  // Try to sync with backend
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    try {
      const url = `${API_BASE_URL}/api/v1/wishlist/items`;
      await fetch(url, {
        method: "POST",
        headers: buildHeaders(),
        credentials: "include",
        body: JSON.stringify({ productId: product.productId }),
      });
    } catch {
      // Ignore backend errors, local storage is source of truth
    }
  }

  return wishlist;
};

// Remove from wishlist
export const removeWishlistItem = async (
  wishlistItemId: string
): Promise<Wishlist> => {
  const wishlist = getLocalWishlist();

  wishlist.items = wishlist.items.filter(
    (i) => i.id !== wishlistItemId && i.productId !== wishlistItemId
  );

  saveLocalWishlist(wishlist);

  // Try to sync with backend
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    try {
      const url = `${API_BASE_URL}/api/v1/wishlist/items/${wishlistItemId}`;
      await fetch(url, {
        method: "DELETE",
        headers: buildHeaders(),
        credentials: "include",
      });
    } catch {
      // Ignore backend errors
    }
  }

  return wishlist;
};

// Clear wishlist
export const clearWishlist = async (): Promise<Wishlist> => {
  const empty: Wishlist = { items: [] };
  saveLocalWishlist(empty);

  // Try to sync with backend
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    try {
      const url = `${API_BASE_URL}/api/v1/wishlist`;
      await fetch(url, {
        method: "DELETE",
        headers: buildHeaders(),
        credentials: "include",
      });
    } catch {
      // Ignore backend errors
    }
  }

  return empty;
};
