import { getDeviceId } from "@/lib/device-storage";

export interface Address {
  _id: string;
  customerId: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  _id: string;
  fullName: string;
  email?: string;
  mobile: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

interface AddressPayload {
  label?: string;
  fullName?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  isDefault?: boolean;
}

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

const fetchUserProfile = async (): Promise<Customer | null> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/customers/me`, {
    credentials: "include",
    headers: buildHeaders(),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return (data?.data?.customer ?? data?.customer ?? null) as Customer | null;
};

const getCurrentCustomerId = async (): Promise<string> => {
  const me = await fetchUserProfile();
  if (!me?._id || me._id === "guest") {
    throw new Error("Please sign in to manage addresses");
  }
  return me._id;
};

const getApiError = async (
  response: Response,
  fallback = "Request failed"
): Promise<never> => {
  let message = fallback;
  try {
    const d = await response.json();
    message = d?.message || d?.error || fallback;
  } catch {
    // use fallback
  }
  throw new Error(message);
};

// ===== READ (List all addresses) =====
export const fetchAddresses = async (): Promise<Address[]> => {
  const customerId = await getCurrentCustomerId();
  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses`;
  
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: buildHeaders(),
  });
  
  if (!response.ok) return getApiError(response, "Failed to fetch addresses");
  
  const data = await response.json();
  return data?.data?.items ?? data?.items ?? [];
};

// ===== CREATE =====
export const addAddress = async (
  addressData: Omit<Address, "_id" | "customerId" | "createdAt" | "updatedAt">
): Promise<Address> => {
  const customerId = await getCurrentCustomerId();
  const {
    label,
    fullName,
    line1,
    line2,
    city,
    state,
    pincode,
    country,
    isDefault,
  } = addressData;
  
  const body: AddressPayload = {
    label,
    fullName,
    line1,
    line2,
    city,
    state,
    pincode,
    country,
    isDefault,
  };

  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) return getApiError(response, "Failed to add address");

  const data = await response.json();
  return data?.data?.address ?? data?.address;
};

// ===== UPDATE =====
export const updateAddress = async (
  addressId: string,
  addressData: Partial<
    Omit<Address, "_id" | "customerId" | "createdAt" | "updatedAt">
  >
): Promise<Address> => {
  const customerId = await getCurrentCustomerId();
  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses/${addressId}`;
  const body: AddressPayload = { ...addressData };

  const response = await fetch(url, {
    method: "PUT",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) return getApiError(response, "Failed to update address");
  
  const data = await response.json();
  return data?.data?.address ?? data?.address;
};

// ===== DELETE =====
export const deleteAddress = async (
  addressId: string
): Promise<{ success: boolean }> => {
  const customerId = await getCurrentCustomerId();
  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses/${addressId}`;
  
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: buildHeaders(),
  });
  
  if (!response.ok) return getApiError(response, "Failed to delete address");
  return { success: true };
};

// ===== SET DEFAULT =====
export const setDefaultAddress = async (
  addressId: string
): Promise<Address> => {
  return updateAddress(addressId, { isDefault: true });
};
