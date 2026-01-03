import { fetchUserProfile, type Address, type User } from "./auth-service";
import { parseAddressToBackend } from "@/lib/api-utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8018";

type BackendAddressPayload = {
  label?: string; // added label
  fullName?: string; // use fullName instead of name for backend
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isDefault?: boolean;
};

type ParsedAddress = {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  pincode: string;
};

const getCurrentCustomerId = async (): Promise<string> => {
  const me = await fetchUserProfile();
  if (!me?.id || me.id === "guest") {
    throw new Error("Please sign in to manage addresses");
  }
  return me.id;
};

export const addAddress = async (
  addressData: Omit<Address, "id">
): Promise<User> => {
  const customerId = await getCurrentCustomerId();

  const body: BackendAddressPayload = {
    label: "Home",
    fullName: addressData.name,
  };

  if (addressData.address || addressData.cityZip) {
    const parsed = parseAddressToBackend(
      addressData.address || "",
      addressData.cityZip || ""
    ) as ParsedAddress;
    Object.assign(body, parsed);
  }

  if (typeof addressData.isDefault === "boolean") {
    body.isDefault = addressData.isDefault;
  }

  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to add address: ${response.status}`);
  }

  return fetchUserProfile();
};

export const updateAddress = async (
  addressId: string,
  addressData: Partial<Address>
): Promise<User> => {
  const customerId = await getCurrentCustomerId();
  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses/${addressId}`;

  const body: BackendAddressPayload = {};
  if (addressData.name) body.fullName = addressData.name;

  if (addressData.address && addressData.cityZip) {
    const parsed = parseAddressToBackend(
      addressData.address,
      addressData.cityZip
    ) as ParsedAddress;
    Object.assign(body, parsed);
  } else if (addressData.address) {
    const parts = addressData.address.split(",").map((s) => s.trim());
    body.line1 = parts[0] || "";
    body.line2 = parts[1] || "";
  } else if (addressData.cityZip) {
    const parts = addressData.cityZip.split(",").map((s) => s.trim());
    body.city = parts[0] || "";
    body.state = parts[1] || "";
    body.pincode = parts[2] || parts[parts.length - 1] || "";
  }

  if (typeof addressData.isDefault === "boolean") {
    body.isDefault = addressData.isDefault;
  }

  const response = await fetch(url, {
    method: "PUT", // use PUT as per backend route
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to update address: ${response.status}`);
  }

  return fetchUserProfile();
};

export const deleteAddress = async (addressId: string): Promise<User> => {
  const customerId = await getCurrentCustomerId();
  const url = `${API_BASE_URL}/api/v1/customers/${customerId}/addresses/${addressId}`;

  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Failed to delete address: ${response.status}`);
  }

  return fetchUserProfile();
};

export const setDefaultAddress = async (addressId: string): Promise<User> => {
  return updateAddress(addressId, { isDefault: true });
};
