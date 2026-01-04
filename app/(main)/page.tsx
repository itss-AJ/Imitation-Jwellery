"use client";

import BestSeller from "@/app/components/BestSeller";
import CommonHeading from "@/app/components/CommonHeading";
import CommonProductCard from "@/app/components/CommonProductCard";
import HomeCategoriesSection from "@/app/components/HomeCategoriesSection";
import HomeCustomerFeedback from "@/app/components/HomeCustomerFeedback";
import HomeFeaturedCollectionSection from "@/app/components/HomeFeaturedCollectionSection";
import HomeFollowOnSocialSection from "@/app/components/HomeFollowOnSocialSection";
import HomeHeroSection from "@/app/components/HomeHeroSec";
import HomeStoreFeature from "@/app/components/HomeStoreFeature";
import ProductFeatureStrip from "@/app/components/ProductFeatureStrip";
import { useProductsInfinite } from "@/hooks/use-products";
import { useMemo } from "react";

export default function Home() {
  const { data: newArrivalData, isLoading: isLoadingNewArrivals } =
    useProductsInfinite({
      isNewArrival: true,
    });

  const newArrivalPages = useMemo(
    () => newArrivalData?.pages ?? [],
    [newArrivalData]
  );

  const newArrivalProducts = useMemo(
    () =>
      newArrivalPages
        .flatMap((page) => (Array.isArray(page.data) ? page.data : []))
        .slice(0, 6),
    [newArrivalPages]
  );

  const FEATURED_PRODUCTS =
    newArrivalProducts.length === 6
      ? newArrivalProducts
      : [
          {
            id: "static-1",
            title: "Glossy Heart Stud",
            price: "Rs. 799.00",
            image: "/img/bracelet-img.webp",
            priceNumber: 799,
            createdAtMs: 0,
            isNewArrival: true,
            isBestSeller: false,
            stockQty: 10,
          },
          {
            id: "static-2",
            title: "Interlocking Hoop Earring",
            price: "Rs. 1,299.00",
            image: "/img/bracelets.webp",
            priceNumber: 1299,
            createdAtMs: 0,
            isNewArrival: true,
            isBestSeller: false,
            stockQty: 10,
          },
          {
            id: "static-3",
            title: "Classic Jewelry Set",
            price: "Rs. 1,299.00",
            image: "/img/jewelrySet.webp",
            priceNumber: 1299,
            createdAtMs: 0,
            isNewArrival: true,
            isBestSeller: false,
            stockQty: 10,
          },
          {
            id: "static-4",
            title: "Elegant Pendant",
            price: "Rs. 1,299.00",
            image: "/img/pendant_old.webp",
            priceNumber: 1299,
            createdAtMs: 0,
            isNewArrival: true,
            isBestSeller: false,
            stockQty: 10,
          },
          {
            id: "static-5",
            title: "Gold Finish Necklace",
            price: "Rs. 1,299.00",
            image: "/img/necklace.webp",
            priceNumber: 1299,
            createdAtMs: 0,
            isNewArrival: true,
            isBestSeller: false,
            stockQty: 10,
          },
          {
            id: "static-6",
            title: "Minimal Gold Bracelet",
            price: "Rs. 1,199.00",
            image: "/img/bracelet-img.webp",
            priceNumber: 1199,
            createdAtMs: 0,
            isNewArrival: true,
            isBestSeller: false,
            stockQty: 10,
          },
        ];


  return (
    <div className="homepageWrap gradientBg">
      <HomeHeroSection />

      <ProductFeatureStrip />

      <HomeCategoriesSection />

      <BestSeller />

      <HomeCustomerFeedback />

      {/* New Arrival */}
      <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
        <CommonHeading
          level={1}
          title="New Arrival"
          description="Jewelry crafted with care, guided by responsibility."
        />

        <div className="commonProductGrid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-10 max-w-[1560px] mx-auto">
          {isLoadingNewArrivals ? (
            <div className="col-span-full text-center py-10">
              Loading products...
            </div>
          ) : (
            FEATURED_PRODUCTS.map((product) => (
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

      <HomeFeaturedCollectionSection />
      <HomeFollowOnSocialSection />
      <HomeStoreFeature />
    </div>
  );
}
