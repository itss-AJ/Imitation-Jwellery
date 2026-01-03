export interface LoginCredentials {
  mobile: string;
  otp: string;
}

export interface Address {
  id: string;
  name: string;
  address: string;
  cityZip: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface BackendCustomer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  mobile?: string;
}

interface BackendAddress {
  _id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  pincode: string;
  isDefault: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

import { formatAddressFromBackend } from "@/lib/api-utils";

// Device id for consistency across services
const getDeviceId = (): string => {
  if (typeof window === "undefined") return "";
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = `device-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};

const transformAddress = (backendAddr: BackendAddress): Address => {
  const { address, cityZip } = formatAddressFromBackend(
    backendAddr.line1,
    backendAddr.line2,
    backendAddr.city,
    backendAddr.state,
    backendAddr.pincode
  );
  return {
    id: backendAddr._id,
    name: backendAddr.name,
    address,
    cityZip,
    isDefault: backendAddr.isDefault || false,
  };
};

const transformCustomer = (
  backendCustomer: BackendCustomer,
  addresses: BackendAddress[] = []
): User => {
  return {
    id: backendCustomer._id,
    name: backendCustomer.name || "",
    email: backendCustomer.email || "",
    phone: backendCustomer.phone || backendCustomer.mobile || "",
    addresses: Array.isArray(addresses) ? addresses.map(transformAddress) : [],
  };
};

const guestUser: User = {
  id: "guest",
  name: "",
  email: "",
  phone: "",
  addresses: [],
};

// Never throw for /customers/me; return guest on 401/non-OK
export const fetchUserProfile = async (): Promise<User> => {
  const url = `${API_BASE_URL}/api/v1/customers/me`;
  const deviceId = getDeviceId();

  try {
    const response = await fetch(url, {
      headers: { "X-Device-Id": deviceId },
    });

    if (response.status === 401) return guestUser;
    if (!response.ok) {
      console.warn(`fetchUserProfile: non-OK status ${response.status}`);
      return guestUser;
    }

    const responseData = await response.json();
    const backendCustomer: BackendCustomer | null =
      responseData?.data?.customer ?? responseData?.data ?? null;

    if (!backendCustomer || !backendCustomer._id) {
      return guestUser;
    }

    // Addresses optional; ignore failures
    let addresses: BackendAddress[] = [];
    try {
      const addressesUrl = `${API_BASE_URL}/api/v1/customers/${backendCustomer._id}/addresses`;
      const addressesResponse = await fetch(addressesUrl);
      if (addressesResponse.ok) {
        const addressesData = await addressesResponse.json();
        addresses =
          addressesData.data?.items ||
          addressesData.data ||
          addressesData.items ||
          [];
      }
    } catch {}

    return transformCustomer(backendCustomer, addresses);
  } catch (err) {
    console.warn("fetchUserProfile: error", err);
    return guestUser;
  }
};

export const loginUser = async (
  _credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  const user = await fetchUserProfile();
  return { user, token: "mock-jwt-token" };
};

// Authenticated profile update; throws on 401/non-OK so UI can show error
export const updateUserProfile = async (
  payload: Partial<{ name: string; email: string; phone: string }>
): Promise<User> => {
  const url = `${API_BASE_URL}/api/v1/customers/me`;

  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    throw new Error("Please sign in to update your profile");
  }
  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.status}`);
  }

  // Refresh full profile (including addresses)
  return fetchUserProfile();
};
