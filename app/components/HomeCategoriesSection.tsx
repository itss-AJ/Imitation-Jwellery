"use client";

import React from "react";
import CommonButton from "./button/CommonButton";
import CommonHeading from "./CommonHeading";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

type CategoryItem = {
  id: number;
  name: string;
  image: string;
};

const CATEGORIES: CategoryItem[] = [
  { id: 1, name: "Necklace", image: "/img/necklace.webp" },
  { id: 2, name: "Jewelry Set", image: "/img/jewelrySet.webp" },
  { id: 3, name: "Earring", image: "/img/earring.webp" },
  { id: 4, name: "Pendant", image: "/img/pendant.webp" },
  { id: 5, name: "Bracelet", image: "/img/bracelets.webp" },
];

export default function HomeCategoriesSection() {
  return (
    <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
      <CommonHeading
        level={1}
        title="Welcome to Privora"
        description="Welcome to White Bunny, where elegance meets simplicity. We are a contemporary jewelry brand crafted for the modern Indian woman who values minimalism, affordability, and self-expression. Our jewelry is designed to be more than just an accessory—it's a reflection of your personality, confidence, and unique style."
      />

      <div className="max-w-[1560px] mx-auto commonSliderWrap">
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
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
        >
          {CATEGORIES.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="productCategoryItem h-52 md:h-80 relative overflow-hidden rounded-2xl flex items-end justify-center p-6">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <CommonButton
                  variant="secondaryBtn"
                  className="relative z-10"
                >
                  {category.name}
                </CommonButton>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
