/**
 * Utility functions for API response handling and data transformation
 */

/**
 * Format price in Indian Rupees format
 */
export const formatPrice = (price: number): string => {
  return `Rs. ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format price in Indian Rupees (short format for display)
 */
export const formatPriceShort = (amount: number): string => {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
};

/**
 * Extract data from standard API response format
 * { success: true, message: "OK", data: {...} }
 */
export const extractApiData = <T>(
  responseData: unknown,
  dataKey?: string
): T | null => {
  const container =
    typeof responseData === "object" && responseData !== null
      ? (responseData as Record<string, unknown>)
      : null;

  if (!container) return null;

  const dataField = (container["data"] ?? null) as Record<
    string,
    unknown
  > | null;

  if (dataKey) {
    if (dataField && dataKey in dataField) {
      return dataField[dataKey] as T;
    }
    return null;
  }

  if (dataField) {
    return dataField as unknown as T;
  }

  return container as unknown as T;
};

/**
 * Parse address into backend format
 */
export const parseAddressToBackend = (address: string, cityZip: string) => {
  const addressParts = address.split(",").map((s) => s.trim());
  const cityZipParts = cityZip.split(",").map((s) => s.trim());

  return {
    line1: addressParts[0] || "",
    line2: addressParts[1] || "",
    city: cityZipParts[0] || "",
    state: cityZipParts[1] || "",
    pincode: cityZipParts[2] || cityZipParts[cityZipParts.length - 1] || "",
  };
};

/**
 * Format address from backend to frontend
 */
export const formatAddressFromBackend = (
  line1: string,
  line2?: string,
  city?: string,
  state?: string,
  pincode?: string
) => {
  const addressLine = [line1, line2].filter(Boolean).join(", ");
  const cityZip = [city, state, pincode].filter(Boolean).join(", ");

  return {
    address: addressLine,
    cityZip: cityZip,
  };
};
