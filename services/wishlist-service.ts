// src/services/wishlist-service.ts

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

// device based storage key
const storageKey = () => `wishlist:${getDeviceId()}`;

// read wishlist
const getLocalWishlist = (): Wishlist => {
  return getLocal<Wishlist>(storageKey(), { items: [] });
};

// save wishlist
const saveLocalWishlist = (wishlist: Wishlist): void => {
  setLocal(storageKey(), wishlist);
};

// get wishlist
export const getWishlist = async (): Promise<Wishlist> => {
  return getLocalWishlist();
};

// add to wishlist
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

  return wishlist;
};

// remove from wishlist
export const removeWishlistItem = async (
  wishlistItemId: string
): Promise<Wishlist> => {
  const wishlist = getLocalWishlist();

  wishlist.items = wishlist.items.filter(
    (i) => i.id !== wishlistItemId && i.productId !== wishlistItemId
  );

  saveLocalWishlist(wishlist);

  return wishlist;
};

// clear wishlist
export const clearWishlist = async (): Promise<Wishlist> => {
  const empty: Wishlist = { items: [] };
  saveLocalWishlist(empty);
  return empty;
};
