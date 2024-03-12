import React, { useRef, useState } from 'react';
import { Book } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules'
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import Loading from '../loading';

export interface BookCardProps {
    heading: string;
    books: Book[];
    loading:boolean;
  }
const BookCard:React.FC<BookCardProps> = ({books, heading, loading}) => {
  return (
    <div className='mx-2 sm:mx-2 md:mx-5 lg:mx-10 p-2 md:p-4 lg:p-6 my-5'>
        <div> <h1 className='text-3xl font-bold text-center'>{heading}</h1> </div>
        <div className='my-3 md:my-4 lg:my-5 lg:pt-5'> 
       
        
            {
              loading ? (
                <div>
                  <Loading/>
                </div>
              ):(
                <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper w-full h-full"
              >
                
                {
                    books?.map(b=>(
                        <SwiperSlide className='swiper-slide mb-12  p-4 rounded shadow-md bg-gray-100 hover:bg-slate-300 hover:transition delay-150'> 
                        <Link href={`/books/${b._id}`}>
                            <div className='relative'>
                                <img 
                                src={b.image} 
                                alt="bookimg"
                                className='w-full lg:max-h-72  p-2'
                                />
                                <div className='absolute top-3 right-3 bg-blue-600 p-2 rounded'>
                                    <FaShoppingCart className='w-4 h-4 text-white'/>
                                </div>
                            </div>
                            <div className='h-12 p-2'>
                                <h3 className='font-medium'>{b.name}</h3>
                                 
                            </div>
                            </Link>
                            </SwiperSlide>
                    ))
                }
               
                </Swiper>
              )
            }
        
        
     
        </div>
        
    </div>
  )
}

export default BookCard;