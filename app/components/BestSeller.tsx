"use client";

import CommonHeading from "./CommonHeading";
import CommonProductCard from "./CommonProductCard";
import { useProductsInfinite } from "@/hooks/use-products";
import { useMemo } from "react";

const FALLBACK_PRODUCTS = [
  {
    id: "best-1",
    title: "Glossy Heart Stud",
    price: "Rs. 799.00",
    image: "/img/bracelet-img.webp",
  },
  {
    id: "best-2",
    title: "Interlocking Hoop Earring",
    price: "Rs. 1,299.00",
    image: "/img/bracelets.webp",
  },
  {
    id: "best-3",
    title: "Classic Jewelry Set",
    price: "Rs. 1,299.00",
    image: "/img/jewelrySet.webp",
  },
  {
    id: "best-4",
    title: "Elegant Pendant",
    price: "Rs. 1,299.00",
    image: "/img/pendant_old.webp",
  },
  {
    id: "best-5",
    title: "Gold Finish Necklace",
    price: "Rs. 1,299.00",
    image: "/img/necklace.webp",
  },
  {
    id: "best-6",
    title: "Minimal Bracelet",
    price: "Rs. 999.00",
    image: "/img/bracelet-img.webp",
  },
];

export default function BestSeller() {
  const { data, isLoading } = useProductsInfinite({
    isBestSeller: true,
  });

  const products = useMemo(() => {
    const apiProducts =
      data?.pages
        ?.flatMap((p) => (Array.isArray(p.data) ? p.data : []))
        .slice(0, 6) ?? [];

    return apiProducts.length > 0 ? apiProducts : FALLBACK_PRODUCTS;
  }, [data]);

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
          products.map((product) => (
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
