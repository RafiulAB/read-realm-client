'use client'
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Book } from '@/utils';
import { toast } from 'react-toastify';

export type CartItem = Book & { quantity: number };

type CartContextType = {
  cart: Book[] | null;
  addToCart: (item: Book) => void;
  removeFromCart: (item: Book) => void;

};

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[] | null>([]);
   
  useEffect(()=>{
    const cartItems:any = localStorage.getItem('item')
    const cBook:CartItem[] |null = JSON.parse(cartItems)
    setCart(cBook);
  },[])

const addToCart =useCallback((book:Book)=>{
  setCart((prev:any)=>{
    let updatedCart;
    if (prev) {
      updatedCart = [...prev, book]
    }else{
      updatedCart= [book]
    }
    toast.success('Book added to cart')
    localStorage.setItem('item', JSON.stringify(updatedCart))
    return updatedCart;
  })
},[])

const removeFromCart = useCallback((book:Book)=>{
  
    if (cart) {
      const filteredBook = cart.filter((item)=>{
        return item._id !== book._id
      })
      setCart(filteredBook)
      toast.success('Book removed from cart')
      localStorage.setItem('item', JSON.stringify(filteredBook))

    }
},[cart])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }} >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
