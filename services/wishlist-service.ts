export interface WishlistItem {
  id: string
  productId: string
  title: string
  price: string
  image: string
}

export interface Wishlist {
  items: WishlistItem[]
}

export const fetchWishlist = async (): Promise<Wishlist> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    items: [
      { id: "1", productId: "1", title: "Heart Gold Pendant", price: "Rs. 299.00", image: "/img/bracelet-img.webp" },
      { id: "2", productId: "2", title: "Classic Fan Pendant", price: "Rs. 399.00", image: "/img/bracelets.webp" },
    ],
  }
}

export const addToWishlist = async (
  productId: string,
  title: string,
  price: string,
  image: string,
): Promise<Wishlist> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    items: [{ id: productId, productId, title, price, image }],
  }
}

export const removeFromWishlist = async (wishlistItemId: string): Promise<Wishlist> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return { items: [] }
}
