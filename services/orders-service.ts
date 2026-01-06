import { getDeviceId } from "@/lib/device-storage";
import { formatPriceShort } from "@/lib/api-utils";

export interface Order {
  id: string;
  date: string;
  total: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: number;
}

interface BackendOrder {
  _id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: { productId: string; quantity: number }[] | number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const mapStatus = (
  backendStatus: string
): "Processing" | "Shipped" | "Delivered" | "Cancelled" => {
  const statusMap: Record<
    string,
    "Processing" | "Shipped" | "Delivered" | "Cancelled"
  > = {
    pending: "Processing",
    processing: "Processing",
    confirmed: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return statusMap[backendStatus.toLowerCase()] || "Processing";
};

const transformOrder = (backendOrder: BackendOrder): Order => {
  return {
    id: backendOrder.orderNumber || backendOrder._id,
    date: formatDate(backendOrder.createdAt),
    total: formatPriceShort(backendOrder.totalAmount),
    status: mapStatus(backendOrder.status),
    items: Array.isArray(backendOrder.items)
      ? backendOrder.items.length
      : typeof backendOrder.items === "number"
        ? backendOrder.items
        : 0,
  };
};

export const fetchOrders = async (): Promise<Order[]> => {
  const url = `${API_BASE_URL}/api/v1/orders`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 401) {
        return [];
      }
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    const responseData = await response.json();

    let backendOrders: BackendOrder[] = [];

    if (responseData.data?.items && Array.isArray(responseData.data.items)) {
      backendOrders = responseData.data.items;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      backendOrders = responseData.data;
    } else if (responseData.items && Array.isArray(responseData.items)) {
      backendOrders = responseData.items;
    } else if (Array.isArray(responseData)) {
      backendOrders = responseData;
    }

    return backendOrders.map(transformOrder);
  } catch {
    return [];
  }
};

export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  const url = `${API_BASE_URL}/api/v1/orders/${orderId}`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) {
      return null;
    }

    const responseData = await response.json();
    const backendOrder: BackendOrder | undefined =
      responseData?.data?.order ?? responseData?.data ?? responseData?.order;

    if (!backendOrder) return null;

    return transformOrder(backendOrder);
  } catch {
    return null;
  }
};

export const cancelOrder = async (orderId: string): Promise<{ success: boolean; message: string }> => {
  const url = `${API_BASE_URL}/api/v1/orders/${orderId}/cancel`;

  const response = await fetch(url, {
    method: "PUT",
    credentials: "include",
    headers: buildHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Failed to cancel order");
  }

  return { success: true, message: data?.message || "Order cancelled" };
};

// Full order details for order detail page
export interface OrderItem {
  productId: string;
  productName: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  } | null;
  paymentMethod: string;
  expectedDelivery?: string;
}

interface BackendOrderDetails {
  _id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  items: {
    productId: string | { _id: string; name: string; thumbnail?: string };
    qty: number;
    unitPrice: number;
  }[];
  subtotalAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress?: {
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  paymentMethod?: string;
  expectedDeliveryDate?: string;
}

const transformOrderDetails = (backend: BackendOrderDetails): OrderDetails => {
  return {
    id: backend._id,
    orderNumber: backend.orderNumber || backend._id,
    date: formatDate(backend.createdAt),
    status: mapStatus(backend.status),
    items: backend.items.map((item) => {
      const product = typeof item.productId === "object" ? item.productId : null;
      return {
        productId: product ? product._id : String(item.productId),
        productName: product?.name || "Product",
        thumbnail: product?.thumbnail || "/img/placeholder.webp",
        quantity: item.qty,
        unitPrice: item.unitPrice,
        totalPrice: item.qty * item.unitPrice,
      };
    }),
    subtotal: backend.subtotalAmount || 0,
    shipping: backend.shippingAmount || 0,
    discount: backend.discountAmount || 0,
    total: backend.totalAmount || 0,
    shippingAddress: backend.shippingAddress
      ? {
          ...backend.shippingAddress,
          country: backend.shippingAddress.country || "India",
        }
      : null,
    paymentMethod: backend.paymentMethod || "Online Payment",
    expectedDelivery: backend.expectedDeliveryDate
      ? formatDate(backend.expectedDeliveryDate)
      : undefined,
  };
};

export const fetchOrderDetails = async (orderId: string): Promise<OrderDetails | null> => {
  const url = `${API_BASE_URL}/api/v1/orders/${orderId}`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) {
      return null;
    }

    const responseData = await response.json();
    const backendOrder: BackendOrderDetails | undefined =
      responseData?.data?.order ?? responseData?.data ?? responseData?.order;

    if (!backendOrder) return null;

    return transformOrderDetails(backendOrder);
  } catch {
    return null;
  }
};
