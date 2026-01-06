"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOrders,
  fetchOrderDetails,
  cancelOrder,
  type OrderDetails,
} from "@/services/orders-service";
import { useUserProfile } from "./use-auth";

export const useOrders = () => {
  const { data: user } = useUserProfile();
  const isLoggedIn = !!user && !!user._id && user._id !== "guest";

  return useQuery({
    queryKey: ["orders", "list"],
    queryFn: fetchOrders,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 10,
  });
};

export const useOrderDetails = (orderId?: string) => {
  return useQuery<OrderDetails | null>({
    queryKey: ["orders", "detail", orderId],
    queryFn: () => fetchOrderDetails(orderId!),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
