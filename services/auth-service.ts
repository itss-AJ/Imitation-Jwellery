export interface LoginCredentials {
  mobile: string
  otp: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
}

export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  // Mock delay for API simulation
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock successful login
  return {
    user: {
      id: "user-1",
      name: "Olivia Grace",
      email: "olivia@gmail.com",
      phone: "+91 1234567890",
    },
    token: "mock-jwt-token",
  }
}

export const fetchUserProfile = async (): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "user-1",
    name: "Olivia Grace",
    email: "olivia@gmail.com",
    phone: "+91 1234567890",
  }
}

export const updateUserProfile = async (user: Partial<User>): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    id: "user-1",
    name: user.name || "Olivia Grace",
    email: user.email || "olivia@gmail.com",
    phone: user.phone || "+91 1234567890",
  }
}
