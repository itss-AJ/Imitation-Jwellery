'use client';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function HomeHeroSection() {
  return (
    <div className=''>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img src="/img/bannerimg2.webp" className='heroBannerImg w-full h-auto' alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/banner3.webp" className='heroBannerImg w-full h-auto' alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
