import { getDeviceId } from "@/lib/device-storage";

export interface User {
  _id: string;
  fullName: string;
  email?: string;
  mobile: string;
}

export interface LoginCredentials {
  mobile: string;
  otp: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

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

// --- PROFILE: get current user ---
export const fetchUserProfile = async (): Promise<User | null> => {
  const url = `${API_BASE_URL}/api/v1/customers/me`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (response.status === 401 || response.status === 403) return null;
    if (!response.ok) return null;

    const responseData = await response.json();
    const customer: User | undefined =
      responseData?.data?.customer ?? responseData?.data ?? undefined;
    if (!customer || !customer._id) return null;

    return {
      _id: customer._id,
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
    };
  } catch {
    return null;
  }
};

// --- REQUEST OTP ---
export const requestOtp = async (mobile: string): Promise<{ success: boolean; message: string }> => {
  const url = `${API_BASE_URL}/api/v1/customers/request-otp`;

  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ mobile }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to send OTP");
  }

  return { success: true, message: data?.message || "OTP sent successfully" };
};

// --- VERIFY OTP / LOGIN ---
export const verifyOtp = async (
  mobile: string,
  otp: string
): Promise<{ user: User; token?: string }> => {
  const url = `${API_BASE_URL}/api/v1/customers/verify-otp`;

  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ mobile, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "OTP verification failed");
  }

  const token = data?.data?.token || data?.token;
  if (token && typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }

  const user = await fetchUserProfile();
  if (!user) {
    throw new Error("Login succeeded but failed to fetch user profile");
  }

  return { user, token };
};

// --- LEGACY LOGIN (for backward compatibility) ---
export const loginUser = async (
  credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  const result = await verifyOtp(credentials.mobile, credentials.otp);
  return { user: result.user, token: result.token || "" };
};

// --- LOGOUT ---
export const logoutUser = async (): Promise<void> => {
  const url = `${API_BASE_URL}/api/v1/customers/logout`;

  try {
    await fetch(url, {
      method: "POST",
      headers: buildHeaders(),
      credentials: "include",
    });
  } catch {
    // Ignore logout API errors
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
};

// --- PROFILE UPDATE ---
export const updateUserProfile = async (
  payload: Partial<{ fullName: string; email: string; mobile: string }>
): Promise<User> => {
  const url = `${API_BASE_URL}/api/v1/customers/me`;

  const response = await fetch(url, {
    method: "PUT",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    throw new Error("Please sign in to update your profile");
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || `Failed to update profile: ${response.status}`);
  }

  const user = await fetchUserProfile();
  if (!user) {
    throw new Error("Profile updated, but failed to fetch new profile");
  }

  return user;
};
