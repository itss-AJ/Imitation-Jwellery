import { getDeviceId } from "@/lib/device-storage";

export interface CheckoutPayload {
  shippingAddressId: string;
  billingAddressId?: string;
  couponCode?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface OrderCreatedResponse {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  paymentUrl?: string;
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

export const createOrderFromCart = async (
  payload: CheckoutPayload
): Promise<OrderCreatedResponse> => {
  const deviceId = getDeviceId();
  const url = `${API_BASE_URL}/api/v1/orders`;

  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({
      deviceId,
      ...payload,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create order");
  }

  const order = data?.data?.order ?? data?.order ?? data?.data;

  return {
    orderId: order?._id || order?.orderId || "",
    orderNumber: order?.orderNumber || "",
    totalAmount: order?.totalAmount || 0,
    paymentUrl: order?.paymentUrl || data?.data?.paymentUrl,
  };
};

export const applyCoupon = async (
  couponCode: string
): Promise<{ discount: number; message: string }> => {
  const deviceId = getDeviceId();
  const url = `${API_BASE_URL}/api/v1/coupons/apply`;

  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ couponCode, deviceId }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Invalid coupon code");
  }

  return {
    discount: data?.data?.discount ?? data?.discount ?? 0,
    message: data?.message || "Coupon applied successfully",
  };
};

export const validateCoupon = async (
  couponCode: string
): Promise<{ valid: boolean; discount: number; message: string }> => {
  const url = `${API_BASE_URL}/api/v1/coupons/validate`;

  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ couponCode }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      valid: false,
      discount: 0,
      message: data?.message || "Invalid coupon code",
    };
  }

  return {
    valid: true,
    discount: data?.data?.discount ?? data?.discount ?? 0,
    message: data?.message || "Coupon is valid",
  };
};
