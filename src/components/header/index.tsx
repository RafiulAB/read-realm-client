import Image from "next/image";
import { Input } from "postcss";
import React from "react";


const Header:React.FC = () => {
  return (
    <div className="bg-gray-200 h-full w-full">
      <div className=" mx-4 sm:mx-6 md:mx-7 lg:mx-10  p-4 sm:p-5 md:p-6 lg:p-8 lg:pt-20 lg:flex lg:flex-wrap md:flex md:flex-wrap">
        <div className="lg:w-1/2 pr-4 md:w-1/2">
          <h1 className="lg:text-4xl font-bold">A JOURNEY THROUGH ANCIENT WISDOM, 
          <span className="text-blue-800"> MEDITATION, AND GLOBAL IMPACT</span></h1>
          <p className="mt-10">Guided by Buddhist masters, John’s path embraced Japanese Zen and Tibetan practices. His transformative 3-year silent retreat, starting in 2011, encapsulates his unwavering commitment to inner growth.</p>

          <div className="lg:flex lg:my-7 lg:mb-20 lg:flex-wrap md:flex md:flex-wrap gap-x-2 sm:gap-x-2 md:gap-x-2 lg:gap-x-4">
            <button className="lg:my-5 md:my-3 sm:my-3 my-2 text-white bg-blue-800 p-2 rounded hover:bg-blue-600 hover:transition-all">Explore now</button>
            <button className="lg:my-5 md:my-3 sm:my-3 text-white bg-blue-800 p-2 rounded hover:bg-blue-600 hover:transition-all">Become a seller</button>
          </div>
        </div>
        <div className=" p-4 lg:w-1/2 md:w-1/2 sm:w-full mx-auto relative">
         
          <Image
          src="/book-2.png"
         fill
          alt="book"
          className="object-scale-down w-full "
          />
          
          
          </div>
      </div>
    </div>
  );
};

export default Header;
