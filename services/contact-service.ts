import { getDeviceId } from "@/lib/device-storage";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const buildHeaders = (): HeadersInit => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    headers["X-Device-Id"] = deviceId;
  }
  return headers;
};

export const submitContactForm = async (
  data: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  const url = `${API_BASE_URL}/api/v1/contact`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result?.message || "Failed to submit form");
    }

    return { success: true, message: result?.message || "Message sent successfully!" };
  } catch (error) {
    throw error;
  }
};
