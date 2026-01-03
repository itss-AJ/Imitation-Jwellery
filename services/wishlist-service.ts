// Local-only wishlist service with typed exports
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

const getDeviceId = (): string => {
  const key = "deviceId";
  if (typeof window === "undefined") return key;
  let id = localStorage.getItem(key);
  if (!id) {
    id = `device-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    try {
      localStorage.setItem(key, id);
    } catch {}
  }
  return id;
};

const localKey = () => `wishlist:${getDeviceId()}`;

export const getWishlist = async (): Promise<Wishlist> => {
  const raw =
    typeof window !== "undefined" ? localStorage.getItem(localKey()) : null;
  return raw ? (JSON.parse(raw) as Wishlist) : { items: [] };
};

export const addWishlistItem = async (
  product: ProductLike
): Promise<Wishlist> => {
  const raw =
    typeof window !== "undefined" ? localStorage.getItem(localKey()) : null;
  const wl: Wishlist = raw ? JSON.parse(raw) : { items: [] };
  if (!wl.items.some((i) => i.productId === product.productId)) {
    wl.items.push({
      id: product.productId,
      productId: product.productId,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    try {
      localStorage.setItem(localKey(), JSON.stringify(wl));
    } catch {}
  }
  return wl;
};

export const removeWishlistItem = async (
  idOrProductId: string
): Promise<Wishlist> => {
  const raw =
    typeof window !== "undefined" ? localStorage.getItem(localKey()) : null;
  const wl: Wishlist = raw ? JSON.parse(raw) : { items: [] };
  wl.items = wl.items.filter(
    (i) => i.id !== idOrProductId && i.productId !== idOrProductId
  );
  try {
    localStorage.setItem(localKey(), JSON.stringify(wl));
  } catch {}
  return wl;
};

export const clearWishlist = async (): Promise<Wishlist> => {
  const wl: Wishlist = { items: [] };
  try {
    localStorage.setItem(localKey(), JSON.stringify(wl));
  } catch {}
  return wl;
};
