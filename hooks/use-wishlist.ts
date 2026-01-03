"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlist,
  type Wishlist,
  type WishlistItem,
  type ProductLike,
} from "@/services/wishlist-service";

export const useWishlist = () => {
  return useQuery<Wishlist, Error>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    staleTime: 1000 * 60 * 10,
    retry: 0,
  });
};

export const useWishlistCount = () => {
  const { data } = useWishlist();
  return data?.items?.length ?? 0;
};

export const useIsWishlisted = (productId: string | number) => {
  const { data } = useWishlist();
  return !!data?.items?.some((i) => i.productId === String(productId));
};

export const useAddToWishlist = () => {
  const qc = useQueryClient();

  return useMutation<Wishlist, Error, ProductLike, { prev?: Wishlist }>({
    mutationFn: (product) => addWishlistItem(product),
    onMutate: async (product) => {
      await qc.cancelQueries({ queryKey: ["wishlist"] });
      const prev = qc.getQueryData<Wishlist>(["wishlist"]) ?? { items: [] };

      // Optimistic update
      const exists = prev.items.some((i) => i.productId === product.productId);
      const next: Wishlist = exists
        ? prev
        : {
            items: [
              ...prev.items,
              {
                id: product.productId,
                productId: product.productId,
                title: product.title,
                price: product.price,
                image: product.image,
              },
            ],
          };

      qc.setQueryData<Wishlist>(["wishlist"], next);
      return { prev };
    },
    onError: (_err, _product, ctx) => {
      if (ctx?.prev) qc.setQueryData<Wishlist>(["wishlist"], ctx.prev);
    },
    onSuccess: (wl) => {
      qc.setQueryData<Wishlist>(["wishlist"], wl);
    },
  });
};

export const useRemoveFromWishlist = () => {
  const qc = useQueryClient();

  return useMutation<Wishlist, Error, string, { prev?: Wishlist }>({
    mutationFn: (idOrProductId) => removeWishlistItem(idOrProductId),
    onMutate: async (idOrProductId) => {
      await qc.cancelQueries({ queryKey: ["wishlist"] });
      const prev = qc.getQueryData<Wishlist>(["wishlist"]) ?? { items: [] };

      // Optimistic removal by either id or productId
      const next: Wishlist = {
        items: prev.items.filter(
          (i) => i.id !== idOrProductId && i.productId !== idOrProductId
        ),
      };

      qc.setQueryData<Wishlist>(["wishlist"], next);
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData<Wishlist>(["wishlist"], ctx.prev);
    },
    onSuccess: (wl) => {
      qc.setQueryData<Wishlist>(["wishlist"], wl);
    },
  });
};

export const useClearWishlist = () => {
  const qc = useQueryClient();
  return useMutation<Wishlist, Error, void>({
    mutationFn: () => clearWishlist(),
    onSuccess: (wl) => {
      qc.setQueryData<Wishlist>(["wishlist"], wl);
    },
  });
};
