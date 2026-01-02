"use client"

import CommonHeading from "@/app/components/CommonHeading"
import CommonProductCard from "@/app/components/CommonProductCard"
import HomeStoreFeature from "@/app/components/HomeStoreFeature"
import CommonButton from "@/app/components/button/CommonButton"
import CommonInput from "@/app/components/input/CommonInput"
import { Heart, Truck } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import FaqSection from "../faq/page"
import ProductReviews from "./ProductReviews"
import { useAddToCart } from "@/hooks/use-cart"
import { useAddToWishlist, useRemoveFromWishlist, useIsWishlisted } from "@/hooks/use-wishlist"
import { useRouter } from "next/navigation"

const thumbnails = ["/img/pendant_old.webp", "/img/bracelets.webp", "/img/bracelet-img.webp", "/img/necklace.webp"]

export default function ProductDetailsPage() {
  const router = useRouter()
  const PRODUCTS = [
    {
      id: 1,
      title: "Glossy Heart Stud",
      price: "Rs. 799.00",
      image: "/img/bracelet-img.webp",
    },
    {
      id: 2,
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/bracelets.webp",
    },
    {
      id: 3,
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/jewelrySet.webp",
    },
    {
      id: 4,
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/pendant_old.webp",
    },
    {
      id: 5,
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/necklace.webp",
    },
  ]

  const PRODUCT_ID = 1
  const PRODUCT_NAME = "Gold Plated Jewelry Set"
  const PRODUCT_PRICE = 2499
  const PRODUCT_IMAGE = thumbnails[0]
  
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(thumbnails[0])

  const addToCart = useAddToCart()
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useRemoveFromWishlist()
  const { data: isWishlisted = false } = useIsWishlisted(PRODUCT_ID)

  const handleAddToCart = () => {
    addToCart.mutate({
      productId: String(PRODUCT_ID),
      name: PRODUCT_NAME,
      price: PRODUCT_PRICE,
      image: PRODUCT_IMAGE,
      quantity,
    })
  }

  const handleOrderNow = () => {
    addToCart.mutate(
      {
        productId: String(PRODUCT_ID),
        name: PRODUCT_NAME,
        price: PRODUCT_PRICE,
        image: PRODUCT_IMAGE,
        quantity,
      },
      {
        onSuccess: () => {
          router.push("/checkout")
        },
      },
    )
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist.mutate(String(PRODUCT_ID))
    } else {
      addToWishlist.mutate({
        productId: String(PRODUCT_ID),
        title: PRODUCT_NAME,
        price: "Rs. 2,499.00",
        image: PRODUCT_IMAGE,
      })
    }
  }

  return (
    <div className="productDetailsPage">
      {/* ================= PRODUCT SECTION ================= */}
      <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12">
        <div className="mx-auto max-w-3xl lg:max-w-full grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 lg:gap-6">
          {/* ================= IMAGES ================= */}
          <div className="flex gap-4 h-fit lg:sticky lg:top-20">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-3">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`
                    relative w-20 h-20 rounded-md overflow-hidden border transition
                    ${
                      activeImage === img
                        ? "border-brand ring-2 ring-brand/40"
                        : "border-foreground/20 hover:border-brand"
                    }
                  `}
                >
                  <Image src={img || "/placeholder.svg"} alt="thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden">
              <Image
                src={activeImage || "/placeholder.svg"}
                alt="product"
                fill
                className="object-cover transition-opacity duration-300"
              />

              {/* Wishlist */}
              <button
                onClick={handleWishlistToggle}
                aria-label="Toggle wishlist"
                className={`
                  absolute top-4 right-4 z-10 h-10 w-10 rounded-full
                  flex items-center justify-center shadow-md transition
                  ${
                    isWishlisted
                      ? "bg-brand text-background"
                      : "bg-background text-foreground hover:bg-brand hover:text-background"
                  }
                `}
              >
                <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
              </button>
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="border border-foreground/20 rounded-xl p-4 md:p-6 lg:p-8">
            <p className="uppercase text-xs tracking-wide mb-2">Privora</p>

            <CommonHeading level={2} title="Gold Plated Jewelry Set" noMargin className="text-left" />

            <p className="text-sm mb-4">Water Proof | Anti Tarnish | Hypoallergenic</p>

            <span className="text-xl font-semibold mb-6 block">Rs. 2,499.00</span>

            {/* Product meta */}
            <div className="text-sm space-y-1.5 mb-6">
              <p>
                <strong className="inline-block w-28">Vendor:</strong> Privora
              </p>
              <p>
                <strong className="inline-block w-28">Type:</strong> Jewelry Set
              </p>
              <p>
                <strong className="inline-block w-28">SKU:</strong> 123456
              </p>
              <p>
                <strong className="inline-block w-28">Availability:</strong> Available
              </p>
            </div>

            {/* Delivery */}
            <div className="border border-foreground/20 rounded-md p-4 mb-6">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                <Truck size={16} /> Estimated Delivery Time
              </div>

              <div className="flex flex-col md:flex-row relative gap-2">
                <CommonInput
                  name="pincode"
                  placeholder="Enter 6-digit pincode"
                  type="number"
                  className="!rounded-full"
                  noMargin
                />
                <CommonButton className="md:absolute md:right-0 md:top-0 h-[45px] w-fit max-w-fit">Check</CommonButton>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center border rounded-full overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2">
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">
                  +
                </button>
              </div>
              <CommonButton
                variant="secondaryBtn"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
              >
                {addToCart.isPending ? "Adding..." : "Add to Cart"}
              </CommonButton>
            </div>

            <CommonButton onClick={handleOrderNow} disabled={addToCart.isPending} className="mb-6">
              {addToCart.isPending ? "Processing..." : "Order Now"}
            </CommonButton>

            {/* Offers */}
            <div className="bg-brand/10 p-4 rounded-md mb-6">
              <p className="font-medium mb-3">Best offers</p>
              <Offer code="GET15" text="Buy any 2 products, Get 15% OFF" />
            </div>

            {/* Accordions */}
            <details className="border-t py-4">
              <summary className="font-medium cursor-pointer">Description</summary>
              <p className="text-sm mt-2">Premium quality jewelry set perfect for festive occasions.</p>
            </details>

            <details className="border-t py-4">
              <summary className="font-medium cursor-pointer">Shipping Information</summary>
              <p className="text-sm mt-2">Ships within 24–48 hours. Free delivery on prepaid orders.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <FaqSection />

      {/* ================= RECENTLY VIEWED ================= */}
      <section className="px-3 md:px-8 lg:px-10 py-8 md:py-10">
        <CommonHeading level={1} title="Recently viewed" />
        <div className="max-w-[1560px] mx-auto commonProductGrid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-10">
          {PRODUCTS.map((p) => (
            <CommonProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* ================= YOU MAY ALSO LIKE ================= */}
      <section className="px-3 md:px-8 lg:px-10 py-8 md:py-10">
        <CommonHeading level={1} title="You may also like" />
        <div className="max-w-[1560px] mx-auto commonProductGrid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-10">
          {PRODUCTS.map((p) => (
            <CommonProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <ProductReviews />
      <HomeStoreFeature />
    </div>
  )
}

/* ================= OFFER ================= */

function Offer({ code, text }: { code: string; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-background p-3 rounded-md">
      <span className="border border-dashed px-2 py-1 text-sm font-medium">{code}</span>
      <p className="text-sm">{text}</p>
    </div>
  )
}
