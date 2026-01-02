import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  loginUser,
  fetchUserProfile,
  updateUserProfile,
  type User,
  type LoginCredentials,
} from "@/services/auth-service"

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      // Store token in localStorage for persistence
      localStorage.setItem("auth-token", data.token)
      // Set user in cache immediately (optimistic update)
      queryClient.setQueryData(["user", "profile"], data.user)
    },
  })
}

export const useUserProfile = (enabled = true) => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: fetchUserProfile,
    enabled, // Only fetch if user is authenticated
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: Partial<User>) => updateUserProfile(user),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "profile"], data)
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      // Placeholder for logout API call
      return Promise.resolve()
    },
    onSuccess: () => {
      localStorage.removeItem("auth-token")
      queryClient.removeQueries({ queryKey: ["user", "profile"] })
      queryClient.removeQueries({ queryKey: ["cart"] })
      queryClient.removeQueries({ queryKey: ["wishlist"] })
      queryClient.removeQueries({ queryKey: ["orders"] })
    },
  })
}

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("auth-token")
  }
  return false
}
