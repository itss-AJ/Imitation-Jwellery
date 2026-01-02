export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

export const fetchCart = async (): Promise<Cart> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    items: [
      {
        id: "1",
        productId: "1",
        name: "NAIL & HOOP EARRING",
        price: 799,
        quantity: 1,
        image: "/img/earring.webp",
      },
      {
        id: "2",
        productId: "2",
        name: "GOLD PLATED DROP HOOP EARRING",
        price: 199,
        quantity: 1,
        image: "/img/pendant.webp",
      },
    ],
    total: 998,
  }
}

export const addToCart = async (
  productId: string,
  name: string,
  price: number,
  image: string,
  quantity = 1,
): Promise<Cart> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock: return updated cart
  return {
    items: [
      {
        id: productId,
        productId,
        name,
        price,
        quantity,
        image,
      },
    ],
    total: price * quantity,
  }
}

export const removeFromCart = async (cartItemId: string): Promise<Cart> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return { items: [], total: 0 }
}

export const updateCartQuantity = async (cartItemId: string, quantity: number): Promise<Cart> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return { items: [], total: 0 }
}
