import { useQuery } from "@tanstack/react-query"
import { fetchProducts, type ProductFilters } from "@/services/product-service"

export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ["products", "list", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData, // Keep previous data during refetching for smoother transitions
  })
}
