"use client";

import CommonHeading from "./CommonHeading";
import CommonProductCard from "./CommonProductCard";
import { useProductsInfinite } from "@/hooks/use-products";
import { useMemo } from "react";

export default function BestSeller() {
  const { data: bestSellerData, isLoading } = useProductsInfinite({
    isBestSeller: true,
    limit: 5,
  });

  const pages = useMemo(() => bestSellerData?.pages ?? [], [bestSellerData]);
  const PRODUCTS = useMemo(
    () =>
      pages
        .flatMap((page) => (Array.isArray(page.data) ? page.data : []))
        .slice(0, 5),
    [pages]
  );

  // Fallback static products
  const fallbackProducts = [
    {
      id: "best-1",
      title: "Glossy Heart Stud",
      price: "Rs. 799.00",
      image: "/img/bracelet-img.webp",
      priceNumber: 799,
      createdAtMs: 0,
      isNewArrival: false,
      isBestSeller: true,
      stockQty: 10,
    },
    {
      id: "best-2",
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/bracelets.webp",
      priceNumber: 1299,
      createdAtMs: 0,
      isNewArrival: false,
      isBestSeller: true,
      stockQty: 10,
    },
    {
      id: "best-3",
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/jewelrySet.webp",
      priceNumber: 1299,
      createdAtMs: 0,
      isNewArrival: false,
      isBestSeller: true,
      stockQty: 10,
    },
    {
      id: "best-4",
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/pendant_old.webp",
      priceNumber: 1299,
      createdAtMs: 0,
      isNewArrival: false,
      isBestSeller: true,
      stockQty: 10,
    },
    {
      id: "best-5",
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/necklace.webp",
      priceNumber: 1299,
      createdAtMs: 0,
      isNewArrival: false,
      isBestSeller: true,
      stockQty: 10,
    },
  ];

  const displayProducts = PRODUCTS.length > 0 ? PRODUCTS : fallbackProducts;

  return (
    <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
      <CommonHeading
        level={1}
        title="Best Seller"
        description="Proudly Supporting Ethical Sourcing - Every Gemstone Has a Story."
      />
      <div className="commonProductGrid productGrid max-w-[1560px] mx-auto">
        {isLoading ? (
          <div className="col-span-full text-center py-10">
            Loading products...
          </div>
        ) : (
          displayProducts.map((product) => (
            <CommonProductCard
              key={product.id}
              productId={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))
        )}
      </div>
    </section>
  );
}
