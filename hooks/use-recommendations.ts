"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchRecommendations,
  fetchSimilarProducts,
  trackProductView,
  type RecommendedProduct,
} from "@/services/recommendation-service";
import { useEffect } from "react";

export const useRecommendations = (limit = 6) => {
  return useQuery<RecommendedProduct[]>({
    queryKey: ["recommendations", limit],
    queryFn: () => fetchRecommendations(undefined, limit),
    staleTime: 1000 * 60 * 10,
  });
};

export const useSimilarProducts = (productId: string, limit = 4) => {
  return useQuery<RecommendedProduct[]>({
    queryKey: ["similar-products", productId, limit],
    queryFn: () => fetchSimilarProducts(productId, limit),
    enabled: !!productId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useTrackProductView = (productId: string) => {
  useEffect(() => {
    if (productId) {
      trackProductView(productId);
    }
  }, [productId]);
};
