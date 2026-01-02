import { useQuery } from "@tanstack/react-query"
import { fetchProductDetail } from "@/services/product-details-service"

export const useProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ["products", "detail", productId],
    queryFn: () => fetchProductDetail(productId),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
