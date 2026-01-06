import { getDeviceId } from "@/lib/device-storage";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "promo" | "system";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

const buildHeaders = (): HeadersInit => {
  const headers: HeadersInit = {};
  const deviceId = getDeviceId();
  if (deviceId && deviceId !== "server") {
    headers["X-Device-Id"] = deviceId;
  }
  return headers;
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  const url = `${API_BASE_URL}/api/v1/notifications`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: buildHeaders(),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const items = data?.data?.items ?? data?.items ?? [];

    return items.map((n: any) => ({
      id: n._id,
      title: n.title,
      message: n.message || n.body,
      type: n.type || "system",
      isRead: n.isRead || false,
      createdAt: n.createdAt,
      link: n.link,
    }));
  } catch {
    return [];
  }
};

export const markNotificationRead = async (notificationId: string): Promise<void> => {
  const url = `${API_BASE_URL}/api/v1/notifications/${notificationId}/read`;
  
  try {
    await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: buildHeaders(),
    });
  } catch {
    // ignore
  }
};

export const markAllNotificationsRead = async (): Promise<void> => {
  const url = `${API_BASE_URL}/api/v1/notifications/read-all`;
  
  try {
    await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: buildHeaders(),
    });
  } catch {
    // ignore
  }
};
