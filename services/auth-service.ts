export interface LoginCredentials {
  mobile: string
  otp: string
}

export interface Address {
  id: string
  name: string
  address: string
  cityZip: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
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
      addresses: [
        {
          id: "addr-1",
          name: "Olivia Grace",
          address: "123 Main Street, Apartment 4B",
          cityZip: "Mumbai, 400001",
          isDefault: true,
        },
        {
          id: "addr-2",
          name: "Olivia Grace",
          address: "456 Park Avenue",
          cityZip: "Delhi, 110001",
          isDefault: false,
        },
      ],
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
    addresses: [
      {
        id: "addr-1",
        name: "Olivia Grace",
        address: "123 Main Street, Apartment 4B",
        cityZip: "Mumbai, 400001",
        isDefault: true,
      },
      {
        id: "addr-2",
        name: "Olivia Grace",
        address: "456 Park Avenue",
        cityZip: "Delhi, 110001",
        isDefault: false,
      },
    ],
  }
}

export const updateUserProfile = async (user: Partial<User>): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    id: "user-1",
    name: user.name || "Olivia Grace",
    email: user.email || "olivia@gmail.com",
    phone: user.phone || "+91 1234567890",
    addresses: user.addresses || [
      {
        id: "addr-1",
        name: "Olivia Grace",
        address: "123 Main Street, Apartment 4B",
        cityZip: "Mumbai, 400001",
        isDefault: true,
      },
    ],
  }
}
