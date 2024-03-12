import Image from "next/image";
import React from "react";

export const Favourite = () => {
  return (
    <div className=" h-full w-full">
      <div className=" mx-4 sm:mx-6 md:mx-7 lg:mx-10  p-4 sm:p-5 md:p-6 lg:p-8 lg:pt-20 lg:flex lg:flex-wrap md:flex md:flex-wrap">
        <div className=" p-4 lg:w-1/2 md:w-1/2 sm:w-full mx-auto relative">
          <Image
            src="/book-3.jpg"
            fill
            alt="book"
            className="object-scale-down w-full "
          />
        </div>
        <div className="lg:w-1/2 lg:pr-4 md:w-1/2">
          <div >
          <h1 className="text-xl lg:text-4xl font-bold">
            Find Your
            <span className="text-blue-800">
              {" "}
              Favourite <br /> Book Here
            </span>
          </h1>
          <p className="mt-10 lg:pr-10">
            Guided by Buddhist masters, John’s path embraced Japanese Zen and
            Tibetan practices. His transformative 3-year silent retreat,
            starting in 2011, encapsulates his unwavering commitment to inner
            growth.
          </p>
          <div className="flex gap-3 my-5 py-5">
             <div className="w-1/3">
                <h2 className="text-2xl font-bold" >800+</h2>
                <p>Book listing</p>
             </div>
             <div className="w-1/3">
                <h2 className="text-2xl font-bold">200+</h2>
                <p>Registred user</p>
             </div>
             <div className="w-1/3">
                <h2 className="text-2xl font-bold">1200+</h2>
                <p>Total Downloads</p>
             </div>
          </div>
          <div className="lg:flex lg:my-5 lg:mb-20 gap-x-2 sm:gap-x-2 md:gap-x-2 lg:gap-x-4">
            <button className="lg:my-3 md:my-3 sm:my-3 my-2 text-white bg-blue-800 p-2 rounded hover:bg-blue-600 hover:transition-all">
              Explore now
            </button>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};
