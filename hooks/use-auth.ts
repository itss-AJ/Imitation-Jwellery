"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  updateUserProfile,
  type User,
} from "@/services/auth-service";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  return useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 0,
    placeholderData: (prev) => prev,
  });
};

export { useAuth as useUserProfile };

export const isAuthenticated = (user?: User): boolean =>
  !!user && user.id !== "guest";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        localStorage.removeItem("authToken");
      } catch {}
      return true;
    },
    onSuccess: () => {
      queryClient.setQueryData<User>(["auth", "me"], {
        id: "guest",
        name: "",
        email: "",
        phone: "",
        addresses: [],
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "list"] });
      router.push("/");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: Partial<{ name: string; email: string; phone: string }>
    ) => {
      return updateUserProfile(payload);
    },
    onSuccess: (user) => {
      queryClient.setQueryData<User>(["auth", "me"], user);
    },
  });
};
