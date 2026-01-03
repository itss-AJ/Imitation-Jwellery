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

// Backend types
interface BackendCartItem {
  _id: string;
  productId:
    | {
        _id: string;
        name: string;
        price: number;
        thumbnail?: string;
        images?: string[];
      }
    | string;
  qty: number;
  unitPrice: number;
  thumbnail?: string;
}

interface BackendCart {
  _id: string;
  items: BackendCartItem[];
  subtotalAmount: number;
  totalAmount: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const getDeviceId = (): string => {
  const key = "deviceId";
  let id = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  if (!id) {
    id = `device-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    try {
      localStorage.setItem(key, id);
    } catch {}
  }
  return id!;
};

const transformCartItem = (backendItem: BackendCartItem): CartItem => {
  const product =
    typeof backendItem.productId === "object" ? backendItem.productId : null;
  return {
    id: backendItem._id,
    productId:
      product?._id ||
      (typeof backendItem.productId === "string" ? backendItem.productId : ""),
    name: product?.name || "Product",
    price:
      typeof backendItem.unitPrice === "number"
        ? backendItem.unitPrice
        : product?.price || 0,
    quantity: typeof backendItem.qty === "number" ? backendItem.qty : 1,
    image:
      product?.thumbnail ||
      backendItem.thumbnail ||
      product?.images?.[0] ||
      "/img/placeholder.webp",
  };
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/**
 * Fetch cart for current device
 */
export const fetchCart = async (): Promise<Cart> => {
  const deviceId = getDeviceId();
  const url = `${API_BASE_URL}/api/v1/cart/${deviceId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) return { items: [], total: 0 };
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }

    const responseData = await response.json();
    const backendCart: BackendCart | null =
      responseData.data?.cart || responseData.data || null;
    if (!backendCart || !Array.isArray(backendCart.items))
      return { items: [], total: 0 };

    const items = backendCart.items.map(transformCartItem);
    return { items, total: calculateTotal(items) };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { items: [], total: 0 };
  }
};

/**
 * Add item
 */
export const addToCart = async (
  productId: string,
  name: string,
  price: number,
  image: string,
  quantity = 1
): Promise<Cart> => {
  const deviceId = getDeviceId();
  const url = `${API_BASE_URL}/api/v1/cart/items`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId, productId, qty: quantity }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add to cart: ${response.status}`);
  }

  const responseData = await response.json();
  const backendCart: BackendCart = responseData.data?.cart || responseData.data;
  const items = Array.isArray(backendCart.items)
    ? backendCart.items.map(transformCartItem)
    : [];
  return { items, total: calculateTotal(items) };
};

/**
 * Remove item → refetch cart to stay in sync (API returns no cart payload)
 */
export const removeFromCart = async (cartItemId: string): Promise<Cart> => {
  const deviceId = getDeviceId();
  const url = `${API_BASE_URL}/api/v1/cart/items/${cartItemId}?deviceId=${deviceId}`;

  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Failed to remove from cart: ${response.status}`);
  }

  // Refetch to get latest server state
  return fetchCart();
};

/**
 * Update quantity
 */
export const updateCartQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<Cart> => {
  const deviceId = getDeviceId();

  if (quantity <= 0) {
    return removeFromCart(cartItemId);
  }

  const url = `${API_BASE_URL}/api/v1/cart/items/${cartItemId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId, qty: quantity }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update cart item: ${response.status}`);
  }

  const responseData = await response.json();
  const backendCart: BackendCart = responseData.data?.cart || responseData.data;
  const items = Array.isArray(backendCart.items)
    ? backendCart.items.map(transformCartItem)
    : [];
  return { items, total: calculateTotal(items) };
};
