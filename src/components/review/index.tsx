import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import ReviewCard from '../reviewCard';

export const Review:React.FC = () => {
  return (
    <div className='my-5 lg:my-8 px-4 lg:px-16'>
        <h1 className='text-3xl font-bold text-center mb-10 '>Our Customers</h1>
        <div className='p-4'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='mb-5 pb-5 lg:pb-8'>
            <ReviewCard/>
        </SwiperSlide>
        <SwiperSlide>
        <ReviewCard/>
        </SwiperSlide>
        <SwiperSlide><ReviewCard/></SwiperSlide>
        <SwiperSlide><ReviewCard/></SwiperSlide>
        <SwiperSlide><ReviewCard/></SwiperSlide>
        <SwiperSlide><ReviewCard/></SwiperSlide>
        <SwiperSlide><ReviewCard/></SwiperSlide>
       
      </Swiper>
        </div>
    </div>
  )
}
