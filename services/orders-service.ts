export interface Order {
  id: string
  date: string
  total: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  items: number
}

export const fetchOrders = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "PRV-10231",
      date: "12 Aug 2024",
      total: "₹3,499",
      status: "Delivered",
      items: 2,
    },
    {
      id: "PRV-10218",
      date: "03 Aug 2024",
      total: "₹1,299",
      status: "Shipped",
      items: 1,
    },
  ]
}
