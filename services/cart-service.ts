import { getDeviceId, getLocal, setLocal } from "@/lib/device-storage";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

interface BackendCartItem {
  _id: string;
  productId:
    | string
    | {
        _id: string;
        name: string;
        price: number;
        thumbnail?: string;
        images?: string[];
      };
  thumbnail?: string;
  qty: number;
  unitPrice: number;
}

interface BackendCart {
  _id: string;
  deviceId: string;
  items: BackendCartItem[];
  subtotalAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const localStorageKey = () => `cart:${getDeviceId()}`;

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

const transformBackendCart = (backendCart: BackendCart | null): Cart => {
  if (!backendCart || !backendCart.items) {
    return { items: [], total: 0 };
  }

  const items: CartItem[] = backendCart.items.map((item) => {
    const product =
      typeof item.productId === "object" ? item.productId : null;

    return {
      id: item._id,
      productId: product ? product._id : String(item.productId),
      name: product?.name || "Product",
      price: item.unitPrice,
      quantity: item.qty,
      image:
        item.thumbnail ||
        product?.thumbnail ||
        product?.images?.[0] ||
        "/img/placeholder.webp",
    };
  });

  return {
    items,
    total: backendCart.totalAmount || 0,
  };
};

const getLocalCart = (): Cart => {
  return getLocal<Cart>(localStorageKey(), { items: [], total: 0 });
};

const setLocalCart = (cart: Cart): void => {
  setLocal(localStorageKey(), cart);
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Fetch cart from backend, fallback to local storage
export const fetchCart = async (): Promise<Cart> => {
  const deviceId = getDeviceId();
  if (!deviceId || deviceId === "server") {
    return getLocalCart();
  }

  try {
    const url = `${API_BASE_URL}/api/v1/cart/${deviceId}`;
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) {
      return getLocalCart();
    }

    const data = await response.json();
    const backendCart: BackendCart | null =
      data?.data?.cart ?? data?.cart ?? null;

    if (!backendCart) {
      return getLocalCart();
    }

    const cart = transformBackendCart(backendCart);
    setLocalCart(cart);
    return cart;
  } catch {
    return getLocalCart();
  }
};

// Add item to cart via backend
export const addToCart = async (
  productId: string,
  name: string,
  price: number,
  image: string,
  quantity = 1
): Promise<Cart> => {
  const deviceId = getDeviceId();

  if (!deviceId || deviceId === "server") {
    const cart = getLocalCart();
    const existing = cart.items.find((i) => i.productId === productId);

    const items = existing
      ? cart.items.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      : [
          ...cart.items,
          { id: productId, productId, name, price, quantity, image },
        ];

    const newCart = { items, total: calculateTotal(items) };
    setLocalCart(newCart);
    return newCart;
  }

  try {
    const url = `${API_BASE_URL}/api/v1/cart/items`;
    const response = await fetch(url, {
      method: "POST",
      headers: buildHeaders(),
      credentials: "include",
      body: JSON.stringify({ deviceId, productId, qty: quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    const data = await response.json();
    const backendCart: BackendCart | null =
      data?.data?.cart ?? data?.cart ?? null;
    const cart = transformBackendCart(backendCart);
    setLocalCart(cart);
    return cart;
  } catch {
    // Fallback to local storage
    const cart = getLocalCart();
    const existing = cart.items.find((i) => i.productId === productId);

    const items = existing
      ? cart.items.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      : [
          ...cart.items,
          { id: productId, productId, name, price, quantity, image },
        ];

    const newCart = { items, total: calculateTotal(items) };
    setLocalCart(newCart);
    return newCart;
  }
};

// Remove item from cart
export const removeFromCart = async (cartItemId: string): Promise<Cart> => {
  const deviceId = getDeviceId();

  if (!deviceId || deviceId === "server") {
    const cart = getLocalCart();
    const items = cart.items.filter(
      (i) => i.id !== cartItemId && i.productId !== cartItemId
    );
    const newCart = { items, total: calculateTotal(items) };
    setLocalCart(newCart);
    return newCart;
  }

  try {
    const url = `${API_BASE_URL}/api/v1/cart/items/${cartItemId}?deviceId=${deviceId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: buildHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }

    return await fetchCart();
  } catch {
    const cart = getLocalCart();
    const items = cart.items.filter(
      (i) => i.id !== cartItemId && i.productId !== cartItemId
    );
    const newCart = { items, total: calculateTotal(items) };
    setLocalCart(newCart);
    return newCart;
  }
};

// Update cart item quantity
export const updateCartQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<Cart> => {
  const deviceId = getDeviceId();

  if (!deviceId || deviceId === "server") {
    const cart = getLocalCart();
    const items =
      quantity <= 0
        ? cart.items.filter((i) => i.id !== cartItemId)
        : cart.items.map((i) =>
            i.id === cartItemId ? { ...i, quantity } : i
          );
    const newCart = { items, total: calculateTotal(items) };
    setLocalCart(newCart);
    return newCart;
  }

  try {
    const url = `${API_BASE_URL}/api/v1/cart/items/${cartItemId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: buildHeaders(),
      credentials: "include",
      body: JSON.stringify({ deviceId, qty: quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item");
    }

    const data = await response.json();
    const backendCart: BackendCart | null =
      data?.data?.cart ?? data?.cart ?? null;
    const cart = transformBackendCart(backendCart);
    setLocalCart(cart);
    return cart;
  } catch {
    const cart = getLocalCart();
    const items =
      quantity <= 0
        ? cart.items.filter((i) => i.id !== cartItemId)
        : cart.items.map((i) =>
            i.id === cartItemId ? { ...i, quantity } : i
          );
    const newCart = { items, total: calculateTotal(items) };
    setLocalCart(newCart);
    return newCart;
  }
};

// Clear cart
export const clearCart = async (): Promise<Cart> => {
  const deviceId = getDeviceId();
  const emptyCart: Cart = { items: [], total: 0 };

  setLocalCart(emptyCart);

  if (!deviceId || deviceId === "server") {
    return emptyCart;
  }

  try {
    const url = `${API_BASE_URL}/api/v1/cart?deviceId=${deviceId}`;
    await fetch(url, {
      method: "DELETE",
      headers: buildHeaders(),
      credentials: "include",
    });
  } catch {
    // Ignore backend errors for clear
  }

  return emptyCart;
};
