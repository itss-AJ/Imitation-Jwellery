import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  type Cart,
} from "@/services/cart-service";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 1000 * 60, // 1 minute
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      name,
      price,
      image,
      quantity,
    }: {
      productId: string;
      name: string;
      price: number;
      image: string;
      quantity?: number;
    }) => addToCart(productId, name, price, image, quantity),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<Cart>(["cart"]);

      if (previousCart) {
        const updatedItems = [...previousCart.items];
        const idx = updatedItems.findIndex(
          (item) => item.productId === newItem.productId
        );
        if (idx !== -1) {
          updatedItems[idx] = {
            ...updatedItems[idx],
            quantity: updatedItems[idx].quantity + (newItem.quantity || 1),
          };
        } else {
          updatedItems.push({
            id: newItem.productId,
            productId: newItem.productId,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity || 1,
            image: newItem.image,
          });
        }
        queryClient.setQueryData(["cart"], {
          items: updatedItems,
          total: updatedItems.reduce((s, i) => s + i.price * i.quantity, 0),
        });
      }

      return { previousCart };
    },
    onError: (_err, _newItem, ctx) => {
      if (ctx?.previousCart)
        queryClient.setQueryData(["cart"], ctx.previousCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => removeFromCart(cartItemId),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<Cart>(["cart"]);

      if (previousCart) {
        const updatedItems = previousCart.items.filter(
          (item) => item.id !== cartItemId
        );
        queryClient.setQueryData(["cart"], {
          items: updatedItems,
          total: updatedItems.reduce((s, i) => s + i.price * i.quantity, 0),
        });
      }

      return { previousCart };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previousCart)
        queryClient.setQueryData(["cart"], ctx.previousCart);
    },
    onSuccess: (data) => {
      // Ensure we sync with server state (we refetch inside service, but set anyway)
      queryClient.setQueryData(["cart"], data);
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: string;
      quantity: number;
    }) => updateCartQuantity(cartItemId, quantity),
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<Cart>(["cart"]);

      if (previousCart) {
        const updatedItems = previousCart.items.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        );
        queryClient.setQueryData(["cart"], {
          items: updatedItems,
          total: updatedItems.reduce((s, i) => s + i.price * i.quantity, 0),
        });
      }

      return { previousCart };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousCart)
        queryClient.setQueryData(["cart"], ctx.previousCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    },
  });
};

export const useCartCount = () => {
  const { data: cart } = useCart();
  const count = Array.isArray(cart?.items) ? cart!.items.length : 0;
  return { data: count };
};