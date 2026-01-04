// src/lib/device-storage.ts

const DEVICE_KEY = "deviceId";

// generate or get device id
export const getDeviceId = (): string => {
  if (typeof window === "undefined") return "server";

  let id = localStorage.getItem(DEVICE_KEY);

  if (!id) {
    id = `device-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    try {
      localStorage.setItem(DEVICE_KEY, id);
    } catch {
      // ignore
    }
  }

  return id;
};

// safe get from localStorage
export const getLocal = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

// safe set to localStorage
export const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
};
