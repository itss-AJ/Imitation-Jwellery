"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import CommonHeading from "@/app/components/CommonHeading";
import CommonButton from "@/app/components/button/CommonButton";
import HomeStoreFeature from "@/app/components/HomeStoreFeature";
import ProductReviews from "../ProductReviews";
import FaqSection from "../../faq/page";
import { useProductDetail } from "@/hooks/use-product-detail";
import { useAddToCart } from "@/hooks/use-cart";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useIsWishlisted,
} from "@/hooks/use-wishlist";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = typeof params.productId === "string" ? params.productId : "";

  const { data: product, isLoading, isError } = useProductDetail(productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const { isWishlisted } = useIsWishlisted(productId);

  if (!productId) {
    return (
      <div className="p-10 text-center">
        <p className="text-foreground/60">Invalid product</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        <p className="text-foreground/60">Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-10 text-center">
        <CommonHeading level={2} title="Product Not Found" />
        <p className="text-foreground/60 mb-6">
          We couldn&apos;t find this product. It may have been removed.
        </p>
        <CommonButton href="/product-list">Browse Products</CommonButton>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart.mutate(
      {
        productId: product.id,
        name: product.title,
        price: product.priceNumber,
        image: product.image,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success(`${product.title} added to cart!`);
        },
        onError: () => {
          toast.error("Failed to add to cart");
        },
      }
    );
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist.mutate(product.id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
    } else {
      addToWishlist.mutate(
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        {
          onSuccess: () => toast.success("Added to wishlist!"),
        }
      );
    }
  };

  const images = product.images.length > 0 ? product.images : [product.image];
  const currentImage = images[selectedImageIndex] || product.image;

  const isOutOfStock = product.availability === "Out of Stock";

  return (
    <div className="productDetailsPage">
      <section className="px-3 md:px-8 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* IMAGE GALLERY */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-foreground/5">
              <Image
                src={currentImage || "/img/placeholder.webp"}
                alt={product.title}
                fill
                className="object-cover"
              />

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center shadow-md transition ${
                  isWishlisted
                    ? "bg-brand text-white"
                    : "bg-white hover:bg-brand hover:text-white"
                }`}
              >
                <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
              </button>

              {/* Tag */}
              {product.tag && (
                <span
                  className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-medium ${
                    product.tag.variant === "secondary"
                      ? "bg-background text-foreground border"
                      : "bg-[#fce9ca] text-foreground"
                  }`}
                >
                  {product.tag.label}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImageIndex === index
                        ? "border-brand"
                        : "border-transparent hover:border-foreground/20"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="border border-foreground/20 rounded-xl p-6 h-fit">
            <CommonHeading level={2} title={product.title} noMargin className="text-left" />

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4 mb-6">
              <span className="text-2xl font-semibold">{product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-foreground/50">{product.oldPrice}</span>
              )}
            </div>

            {/* Availability */}
            <div className="mb-6">
              <span
                className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
                  isOutOfStock
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {product.availability}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* SKU */}
            {product.sku && (
              <p className="text-sm text-foreground/50 mb-6">SKU: {product.sku}</p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-foreground/20 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isOutOfStock}
                  className="p-2 hover:bg-foreground/5 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-[48px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isOutOfStock}
                  className="p-2 hover:bg-foreground/5 disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <CommonButton
              onClick={handleAddToCart}
              disabled={isOutOfStock || addToCart.isPending}
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              {addToCart.isPending
                ? "Adding..."
                : isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
            </CommonButton>

            {/* Product Details */}
            <div className="mt-6 pt-6 border-t border-foreground/10 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Vendor</span>
                <span>{product.vendor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Type</span>
                <span>{product.type}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
      <ProductReviews />
      <HomeStoreFeature />
    </div>
  );
}
