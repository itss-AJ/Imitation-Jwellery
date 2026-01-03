"use client";
import BestSeller from "@/app/components/BestSeller";
import CommonHeading from "@/app/components/CommonHeading";
import EmptyStateSection from "@/app/components/EmptyStateSection";
import Image from "next/image";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/use-wishlist";
import type { WishlistItem } from "@/services/wishlist-service";

export default function Wishlist() {
  const { data } = useWishlist();
  const wishlistItems: WishlistItem[] = data?.items ?? [];
  const removeFromWishlist = useRemoveFromWishlist();

  const isEmpty = wishlistItems.length === 0;

  return (
    <>
      <div className="productListPage gradientBg">
        <section className="max-w-full px-3 md:px-6 lg:px-10 py-6 md:py-6 lg:py-10">
          <CommonHeading level={1} title="Your Wishlist" />

          <div className="w-full max-w-[1560px] mx-auto">
            {!isEmpty && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-y-8">
                {wishlistItems.map((item: WishlistItem) => (
                  <div key={item.id} className="flex items-start gap-4">
                    {/* IMAGE */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title || "Wishlist Item"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-medium text-foreground font-times">
                        {item.title ||
                          `Product ${String(item.productId).slice(0, 6)}`}
                      </h4>

                      <span className="text-sm font-normal text-foreground">
                        {item.price ?? "Rs. —"}
                      </span>

                      <button
                        type="button"
                        aria-label="Remove from wishlist"
                        title="Remove"
                        className="text-xs text-foreground/70 cursor-pointer underline underline-offset-2 hover:text-foreground w-fit"
                        onClick={() =>
                          removeFromWishlist.mutate(String(item.id))
                        }
                        disabled={removeFromWishlist.isPending}
                      >
                        {removeFromWishlist.isPending
                          ? "Removing..."
                          : "Remove"}
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
  );
}
