"use client";

import BookCard from "@/components/bookCard";
import {useCart } from "@/context/cartContext";

import { Book } from "@/utils";
import { Toast } from "flowbite-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";


export default function SingleBook({ params }: { params: { _id: string } }) {
  const [book, setBook] = useState<Book[]>([]);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookInCart, setIsBookInCart]= useState(false);
  const { addToCart,cart } = useCart();
  
  
console.log(cart)
 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://read-realm-server.vercel.app/books/${params._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const data = await response.json();
        setBook(data.books);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

 
    fetchBook();
   
  }, [params._id]);

  useEffect(() => {
    if (book) {
      const fetchRelatedBooks = async () => {
        try {
          const response = await fetch(
            `https://read-realm-server.vercel.app/books/get-all?category=${book.category}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch related books");
          }
          const data = await response.json();
          
          setRelatedBooks(data.books);
          setLoading(false)
        } catch (error) {
          console.error("Error fetching related books:", error);
        }
      };
     
      fetchRelatedBooks();
      
    }
  }, [book]);
 console.log(isBookInCart)
useEffect(()=>{
  setIsBookInCart(false)
  if (cart) {
    const existing = cart.findIndex((item)=> item._id == book._id)
    if (existing > -1) {
      setIsBookInCart(true)
    }
  }
},[cart])
  
  return (
    

   
    <div className="mx-2 lg:mx-12 p-2 lg:p-6">
    
      <div className="flex flex-row gap-2 items-cente">
      
        <div className="p-2  w-full h-full lg:p-14 ">
          <img
            src={book.image}
            alt="bookimg"
            className=""
          />
        </div>
        <div className="lg:p-12">
          <h1 className="text-3xl font-bold my-2 text-gray-800">{book.name}</h1>
          <p className="text-gray-500 font-bold" >BY: {book.author}</p>
          <p className="w-[80%] py-4">{book.desc}</p>
          <p className="text-gray-500 font-bold">Price: ${book.price}</p>
          <button 
          type="button" 
          onClick={()=> addToCart(book)}
          className="bg-blue-800 my-4 text-white p-2 px-4 align-center rounded-lg hover:text-black hover:bg-gray-200
          
          ">
         Add to cart
         </button>
        </div>
      </div>
      <div>
      <BookCard books={relatedBooks} loading={loading} heading="Related Books"/>
      </div>
    </div>
  
  );
}
