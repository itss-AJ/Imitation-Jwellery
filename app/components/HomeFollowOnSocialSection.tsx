"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import CommonHeading from "./CommonHeading";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

type SocialPost = {
  id: number;
  image: string;
  link: string;
};

const SOCIAL_POSTS: SocialPost[] = [
  { id: 1, image: "/img/earring.webp", link: "#" },
  { id: 2, image: "/img/pendant.webp", link: "#" },
  { id: 3, image: "/img/necklace.webp", link: "#" },
  { id: 4, image: "/img/bracelets.webp", link: "#" },
  { id: 5, image: "/img/jewelrySet.webp", link: "#" },
];

export default function HomeFollowOnSocialSection() {
  return (
    <section className="followOnInstaSec px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
      <CommonHeading level={1}>
        Follow us on Instagram
      </CommonHeading>

      <div className="max-w-[1560px] mx-auto commonSliderWrap">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination
          spaceBetween={12}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
        >
          {SOCIAL_POSTS.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="relative h-24 sm:h-32 md:h-40 lg:h-64 overflow-hidden rounded-2xl group">
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <Link href={post.link}>
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 text-background opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Instagram className="h-7 w-7" />
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
