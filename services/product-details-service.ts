export interface ProductDetail {
  id: string
  title: string
  price: string
  oldPrice?: string
  description: string
  image: string
  images: string[]
  vendor: string
  type: string
  sku: string
  availability: "Available" | "Out of Stock"
  tag?: {
    label: string
    variant: "primary" | "secondary"
  }
}

export const fetchProductDetail = async (productId: string): Promise<ProductDetail> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: productId,
    title: "Gold Plated Jewelry Set",
    price: "Rs. 2,499.00",
    oldPrice: "Rs. 2,999.00",
    description: "Premium quality jewelry set perfect for festive occasions.",
    image: "/img/pendant_old.webp",
    images: ["/img/pendant_old.webp", "/img/bracelets.webp", "/img/bracelet-img.webp", "/img/necklace.webp"],
    vendor: "Privora",
    type: "Jewelry Set",
    sku: "123456",
    availability: "Available",
    tag: { label: "New Arrival", variant: "primary" },
  }
}
