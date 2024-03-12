"use client";
import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";

import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/cartContext";


export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [auth, setAuth]= useAuth();
  const cart = useCart()


  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfull");
    
  };
 
  return (
    <div className="bg-blue-400  flex justify-between items-center h-24  px-4 lg:px-14 text-white">
      {/* Logo */}
    
      <a href="/" className="flex items-center space-x-3 mx-3">
        <div className="bg-blue-800 p-2 rounded">
          <FaBookOpen className="text-white w-4 h-4" />
        </div>

        <span className="self-center text-2xl text-blue-800 font-bold whitespace-nowrap">
          READ REALM
        </span>
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        <li className="p-4 text-lg font-semibold text-gray-800  m-2 cursor-pointer duration-300 hover:text-blue-800">
          <Link href="/">Home</Link>
         
        </li>
        <li className="p-4 text-lg font-semibold text-gray-800 m-2 cursor-pointer duration-300 hover:text-blue-800">
          
          <a href="/books">Shop</a>
          
        </li>
        <li className="p-4 text-lg font-semibold text-gray-800 m-2 cursor-pointer duration-300 hover:text-blue-800">
         
          <a href="/about">About</a>
        </li>
        <li className="p-4 text-lg font-semibold text-gray-800 m-2 cursor-pointer duration-300 hover:text-blue-800">
         
          <a href="/contact">Contact</a>
        </li>
        <li className="p-4 py-2  m-2 cursor-pointer duration-300 hover:text-blue-800">
         
        {
          auth.user? <div>
             {
          auth.user?.role =='admin' && <button type="button" className="bg-blue-800 m-1 text-white p-2 px-4 align-center rounded-lg hover:text-black hover:bg-gray-200">
            <a href="/dashboard">Dashboard</a></button>
         }
            <button onClick={handleLogOut} type="button" className="bg-blue-800 text-white p-2 px-4 align-center rounded-lg hover:text-black hover:bg-gray-200">
         Logout
         </button>
        
          </div>: <div>
          <button type="button" className="bg-blue-800 text-white p-2 px-4 align-center rounded-lg hover:text-black hover:bg-gray-200">
         <a href="/login">Login</a>
         </button>
          </div>
        }
        
       </li>
      </ul>
      <a href='/cart' className="relative p-4 lg:px-8">

      <FiShoppingCart className="w-8 h-8 bg-blue-500 rounded-md p-1" />
      <sup className="absolute sm:top-[-2] md:top-[-4] lg:top-[-4] left-12 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cart.cart?.length}</sup>
      </a>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose  size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden p-4 left-[38%] top-[15%] z-10 w-[60%] h-[55%] rounded-lg m-2 border-r-gray-900 bg-blue-400 ease-in-out duration-500"
            : "ease-in-out w-[20%] duration-500 fixed top-0 bottom-0 left-[100%]"
        }
      >
        {/* Mobile Navigation Items */}
      
          <li
            
            className="p-4 border-b rounded-xl hover:bg-white duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <a href='/'>Home</a>
          </li>
          <li
            
            className="p-4 border-b rounded-xl hover:bg-white duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <a href='/books'>Shop</a>
          </li>
          <li
            
            className="p-4 border-b rounded-xl hover:bg-white duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <a href='/about'>About</a>
          </li>
          <li
            
            className="p-4 border-b rounded-xl hover:bg-white duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <a href='/contact'>Contact</a>
          </li>
      
      </ul>
      
    </div>
  );
}
