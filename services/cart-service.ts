// src/services/cart-service.ts

import { getDeviceId, getLocal, setLocal } from "@/lib/device-storage";

// cart item used in frontend
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// cart shape
export interface Cart {
  items: CartItem[];
  total: number;
}

// device based key
const storageKey = () => `cart:${getDeviceId()}`;

// calculate total
const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// read cart
const readCart = (): Cart => {
  return getLocal<Cart>(storageKey(), { items: [], total: 0 });
};

// write cart
const writeCart = (cart: Cart): Cart => {
  setLocal(storageKey(), cart);
  return cart;
};

// fetch cart
export const fetchCart = async (): Promise<Cart> => {
  return readCart();
};

// add to cart
export const addToCart = async (
  productId: string,
  name: string,
  price: number,
  image: string,
  quantity = 1
): Promise<Cart> => {
  const cart = readCart();

  const existing = cart.items.find((i) => i.productId === productId);

  const items = existing
    ? cart.items.map((i) =>
        i.productId === productId
          ? { ...i, quantity: i.quantity + quantity }
          : i
      )
    : [
        ...cart.items,
        {
          id: productId,
          productId,
          name,
          price,
          quantity,
          image,
        },
      ];

  return writeCart({
    items,
    total: calculateTotal(items),
  });
};

// remove item
export const removeFromCart = async (cartItemId: string): Promise<Cart> => {
  const cart = readCart();

  const items = cart.items.filter(
    (i) => i.id !== cartItemId && i.productId !== cartItemId
  );

  return writeCart({
    items,
    total: calculateTotal(items),
  });
};

// update quantity
export const updateCartQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<Cart> => {
  const cart = readCart();

  const items =
    quantity <= 0
      ? cart.items.filter((i) => i.id !== cartItemId)
      : cart.items.map((i) => (i.id === cartItemId ? { ...i, quantity } : i));

  return writeCart({
    items,
    total: calculateTotal(items),
  });
};

// clear cart
export const clearCart = async (): Promise<Cart> => {
  return writeCart({ items: [], total: 0 });
};
