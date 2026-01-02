"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState } from "react"
import CommonButton from "./button/CommonButton"
import { useAddToWishlist, useRemoveFromWishlist } from "@/hooks/use-wishlist"
import { useAddToCart } from "@/hooks/use-cart"

type ProductTagVariant = "primary" | "secondary"

type ProductTag = {
  label: string
  variant?: ProductTagVariant
}

type CommonProductCardProps = {
  title: string
  price: string
  image: string
  productId?: number
  oldPrice?: string

  defaultWishlisted?: boolean
  alwaysShowWishlistIcon?: boolean
  showAddToCart?: boolean
  onAddToCart?: () => void
  tag?: ProductTag
}

export default function CommonProductCard({
  title,
  price,
  image,
  productId = 1,
  defaultWishlisted = false,
  alwaysShowWishlistIcon = false,
  showAddToCart = true,
  onAddToCart,
  oldPrice,
  tag,
}: CommonProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(defaultWishlisted)

  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useRemoveFromWishlist()
  const addToCart = useAddToCart()

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (isWishlisted) {
      removeFromWishlist.mutate(productId)
    } else {
      addToWishlist.mutate(productId)
    }
    setIsWishlisted((prev) => !prev)
  }

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    addToCart.mutate({ productId, quantity: 1 })
    onAddToCart?.()
  }

  const shouldShowWishlistIcon = alwaysShowWishlistIcon || isWishlisted

  return (
    <div className="group text-center commonProductCard">
      {/* IMAGE + LINK */}
      <div className="commonProductImgWrap relative h-[250px] md:h-[320px] w-full overflow-hidden rounded-2xl mb-4">
        {/* Product Tag */}
        {tag && (
          <span
            className={`
              productTag absolute top-3 left-3 z-[2]
              text-[11px] px-2 py-1 rounded-full font-medium shadow-sm
              ${
                tag.variant === "secondary"
                  ? "bg-background text-foreground border border-foreground/20"
                  : "bg-[#fce9ca] text-foreground"
              }
            `}
          >
            {tag.label}
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Toggle wishlist"
          className={`
            wishlistButton absolute top-3 right-3 z-[2]
            h-10 w-10 rounded-full flex items-center justify-center
            shadow-md transition-all duration-300 cursor-pointer
            ${isWishlisted ? "bg-brand text-background" : "bg-background text-foreground"}
            ${
              shouldShowWishlistIcon
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
            }
          `}
        >
          <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
        </button>

        <Link href="/product-details" className="block h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* CONTENT LINK */}
      <Link href="/product-details" className="commonProductTxtWrap  no-underline hover:no-underline">
        <h4 className="font-times text-lg mb-2">{title}</h4>
        {/* PRICE */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="commonProductPrice text-base font-semibold text-foreground">{price}</span>

          {oldPrice && (
            <span className="commonProductOldPrice text-sm text-foreground/50 line-through">{oldPrice}</span>
          )}
        </div>
      </Link>

      {/* ADD TO CART */}
      {showAddToCart && (
        <CommonButton onClick={handleAddToCart} disabled={addToCart.isPending}>
          {addToCart.isPending ? "Adding..." : "Add to Cart"}
        </CommonButton>
      )}
    </div>
  )
}
