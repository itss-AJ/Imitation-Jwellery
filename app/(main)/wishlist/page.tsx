"use client"
import BestSeller from "@/app/components/BestSeller"
import CommonHeading from "@/app/components/CommonHeading"
import EmptyStateSection from "@/app/components/EmptyStateSection"
import Image from "next/image"
import { useWishlist, useRemoveFromWishlist } from "@/hooks/use-wishlist"

type WishlistItem = {
  id: number
  title: string
  price: string
  image: string
}

const initialWishlistItems: WishlistItem[] = [
  { id: 1, title: "Heart Gold Pendant", price: "Rs. 299.00", image: "/img/bracelet-img.webp" },
  { id: 2, title: "Classic Fan Pendant", price: "Rs. 399.00", image: "/img/bracelets.webp" },
  { id: 3, title: "Ruby Square Pendant", price: "Rs. 499.00", image: "/img/earring.webp" },
  { id: 4, title: "Heart Gold Pendant", price: "Rs. 299.00", image: "/img/bracelet-img.webp" },
  { id: 5, title: "Classic Fan Pendant", price: "Rs. 399.00", image: "/img/bracelets.webp" },
  { id: 6, title: "Ruby Square Pendant", price: "Rs. 499.00", image: "/img/earring.webp" },
  { id: 7, title: "Heart Gold Pendant", price: "Rs. 299.00", image: "/img/bracelet-img.webp" },
  { id: 8, title: "Classic Fan Pendant", price: "Rs. 399.00", image: "/img/bracelets.webp" },
  { id: 9, title: "Ruby Square Pendant", price: "Rs. 499.00", image: "/img/earring.webp" },
]

export default function Wishlist() {
  const { data: wishlistItems = [] } = useWishlist()
  const removeFromWishlist = useRemoveFromWishlist()

  const isEmpty = !Array.isArray(wishlistItems) || wishlistItems.length === 0

  return (
    <>
      <div className="productListPage gradientBg">
        <section className="max-w-full px-3 md:px-6 lg:px-10 py-6 md:py-6 lg:py-10">
          <CommonHeading level={1} title="Your Wishlist" />

          <div className="w-full max-w-[1560px] mx-auto">
            {!isEmpty && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-y-8">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    {/* IMAGE */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-medium text-foreground font-times">{item.title}</h4>

                      <span className="text-sm font-normal text-foreground">{item.price}</span>

                      <button
                        className="text-xs text-foreground/70 cursor-pointer underline underline-offset-2 hover:text-foreground w-fit"
                        onClick={() => removeFromWishlist.mutate(item.id)}
                        disabled={removeFromWishlist.isPending}
                      >
                        {removeFromWishlist.isPending ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isEmpty && (
              <EmptyStateSection
                image="/img/wishlist.webp"
                title="Your wishlist is empty"
                description="Save your favorite pieces here so you can easily find them later."
                buttonText="Browse Products"
                buttonHref="/product-list"
              />
            )}
          </div>
        </section>
        <BestSeller />
      </div>
    </>
  )
}
