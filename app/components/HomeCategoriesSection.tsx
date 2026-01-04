"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import CommonButton from "./button/CommonButton";
import CommonHeading from "./CommonHeading";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { fetchCategories } from "@/services/category-service";

export default function HomeCategoriesSection() {
  // fetch categories from backend
  const { data: categories, isLoading } = useQuery({
    queryKey: ["home-categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

  // only active product categories
  const visibleCategories =
    categories?.filter((cat) => cat.type === "category") ?? [];

  return (
    <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
      <CommonHeading
        level={1}
        title="Welcome to Privora"
        description="Welcome to White Bunny, where elegance meets simplicity. We are a contemporary jewelry brand crafted for the modern Indian woman who values minimalism, affordability, and self-expression."
      />

      <div className="max-w-[1560px] mx-auto commonSliderWrap">
        {isLoading ? (
          <div className="text-center py-10">Loading categories...</div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
            spaceBetween={16}
            slidesPerView={2}
            pagination
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
            }}
          >
            {visibleCategories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link href={`/${category.slug}`}>
                  <div className="productCategoryItem h-52 md:h-80 relative overflow-hidden rounded-2xl flex items-end justify-center p-6 cursor-pointer">
                    <img
                      src={category.thumbnail}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <CommonButton
                      variant="secondaryBtn"
                      className="relative z-10"
                    >
                      {category.title}
                    </CommonButton>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
