"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  updateUserProfile,
  logoutUser,
  requestOtp,
  verifyOtp,
  type User,
} from "@/services/auth-service";
import { useRouter } from "next/navigation";

// Fetch current user profile (null if guest)
export const useUserProfile = () => {
  return useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 0,
    placeholderData: (prev) => prev,
  });
};

// Helper: Is the user authenticated (not guest/anonymous)
export const isAuthenticated = (user?: User | null): boolean =>
  !!user && !!user._id && user._id !== "guest";

// Request OTP mutation
export const useRequestOtp = () => {
  return useMutation({
    mutationFn: (mobile: string) => requestOtp(mobile),
  });
};

// Verify OTP mutation
export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ mobile, otp }: { mobile: string; otp: string }) =>
      verifyOtp(mobile, otp),
    onSuccess: (data) => {
      queryClient.setQueryData<User | null>(["auth", "me"], data.user);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      router.push("/");
    },
  });
};

// Log out/reset auth
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData<User | null>(["auth", "me"], null);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      router.push("/");
    },
  });
};

// Profile update
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: Partial<{ fullName: string; email: string; mobile: string }>
    ) => updateUserProfile(payload),
    onSuccess: (user) => {
      queryClient.setQueryData<User | null>(["auth", "me"], user);
    },
  });
};
