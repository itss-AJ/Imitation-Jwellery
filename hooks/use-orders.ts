import { useQuery } from "@tanstack/react-query"
import { fetchOrders } from "@/services/orders-service"
import { isAuthenticated } from "./use-auth"

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders", "list"],
    queryFn: fetchOrders,
    enabled: isAuthenticated(), // only fetch if authenticated
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
