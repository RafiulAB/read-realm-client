'use client'
import { useAuth } from '@/context/authContext';
import { useCart } from '@/context/cartContext';
import { Book } from '@/utils';
import {loadStripe} from '@stripe/stripe-js';


import React, { useEffect, useState } from 'react'
import { IoRemoveOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

export default function Cart() {
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const[book, setBook]= useState<Book[]>([])
    const [auth, setAuth] = useAuth();
    const cart= useCart()
    const {removeFromCart}= useCart()

    useEffect(()=>{
      if (cart.cart) {
        setBook(cart.cart)
       calculateTotal(cart.cart)
      }
    },[cart])


//calculate cart

  const calculateTotal =(book:Book[])=>{
    try {
      let total = 0;
      book.map((item)=>{
          total = total + item.price
          
          setSubtotal(total)
          setTotal(total)
      })
      
    } catch (error) {
      console.log(error)
    }
   }

 const makePyment = async()=>{
    const stripe = await loadStripe('pk_test_51OqHkhLpHAuAr7q1Zpr0fpuhgxHzK8qWWmMPswdDihIJyl3xwm3FbA9uIf1QwkvxqNORcUY0HmJbvyW2KG85LCnF00NUwiE3YX');
    const body = {
      products:cart.cart
    }
    console.log(body.products)
    const headers ={
      "Content-Type":"application/json"
    }
    const response = await fetch('https://read-realm-server.vercel.app/create-checkout',{
      method:"POST",
      headers:headers,
      body: JSON.stringify(body)
    })
console.log(response)
    const session = await response.json();
    console.log(session)
    const result = stripe?.redirectToCheckout({
      sessionId:session.id
    });

 }

  return (
    <div>
        <div className=" h-full bg-gray-100 pt-10">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <h4 className="text-center text-2xl font-bold text-gray-600 bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {book?.length
                  ? `You Have ${book.length} books in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
              
                 
            
            </h4>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {
                  book?.map(b=>
                   <div>
                             <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={b.image} alt="product-image" className="lg:w-38 lg:h-36 rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 lg:text-center lg:p-8 sm:mt-0">
              <h2 className="text-lg  font-bold text-gray-900">{b.name}</h2>
              <p className="mt-1 text-xs text-gray-700">By: {b.author}</p>
            </div>
            <div className="mt-4 flex flex-wrap lg:p-8 items-center justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center mx-4 lg:px-4 border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="1" min="1" />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div className="flex items-center space-x-4 mx-8">
                <p className="text-sm font-bold text-gray-700">{b.price} $</p>
                <button 
                onClick={()=>{removeFromCart(b)}}
                className='p-1 rounded-md bg-red-600 hover:bg-red-800'>
                  <MdDelete className='w-6 h-6 text-white' />
                </button>
               
                
              </div>
            </div>
          </div>
        </div>
                  </div>)
                 }

      </div>
     
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$0.00</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${total} USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button
        onClick={makePyment}
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
    </div>
  </div>
    </div>
  )
}
