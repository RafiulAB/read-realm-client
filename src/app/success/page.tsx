'use client'
import { useAuth } from '@/context/authContext';
import { useCart } from '@/context/cartContext';
import { Book } from '@/utils';
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';

const Success = () => {
    const[book, setBook]= useState<Book[]>([]);
    const cart= useCart();

    useEffect(()=>{
        if (cart.cart) {
          setBook(cart.cart)
       
        }
      },[cart])
      console.log(book)

      // handle download
      const handleDownload = (downloadLink:any) => {
        if (typeof window !== 'undefined') {
          fetch(downloadLink)
            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'book.pdf'); // You may want to extract filename from the download link
              document.body.appendChild(link);
              link.click();
              if (link.parentNode) {
                link.parentNode.removeChild(link);
              }
            })
            .catch(error => console.error('Error downloading file: ', error));
        }
    };

  return (
    <div className='m-2 p-2 lg:m-12 md:m-5 md:p-4 lg:p-5 flex flex-col items-center'>
        <h1 className='text-2xl font-bold text-gray-700'> <span className='text-green-700'>Congratulations! </span>Your payment has been successful.</h1>
        <h1 className='text-2xl font-bold text-gray-700 p-2'>Now you can <span className='text-blue-700'>download</span> your book.</h1>
        <div >
        <div className="rounded-lg md:w-2/3">
      {
                  book?.map(b=>
                   <div>
         <div className="justify-between mb-6 rounded-lg bg-white p-12 shadow-md sm:flex sm:justify-start">
          <img src={b.image} alt="product-image" className="lg:w-38 lg:h-36 rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between px-4">
            <div className="mt-5 lg:text-center lg:p-6 sm:mt-0 ">
              <div className='pr-6'>
              <h2 className="text-lg  font-bold text-gray-900">{b.name}</h2>
              <p className="mt-1 text-xs text-gray-700">By: {b.author}</p>
              <button
              onClick={() => handleDownload(b.file)}
              className='bg-green-400 p-2 m-2 rounded-md'> Download</button>
              </div>
            </div>
            
          </div>
        </div>
                  </div>)
                 }

      </div>
        </div>
    </div>
  )
}

export default Success