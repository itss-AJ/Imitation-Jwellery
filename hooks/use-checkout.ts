"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrderFromCart,
  applyCoupon,
  type CheckoutPayload,
} from "@/services/checkout-service";
import { useRouter } from "next/navigation";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CheckoutPayload) => createOrderFromCart(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        router.push(`/orders?success=true&order=${data.orderNumber}`);
      }
    },
  });
};

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponCode: string) => applyCoupon(couponCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
