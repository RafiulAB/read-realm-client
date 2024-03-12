'use client'
import BestSelling from "@/components/bestSelling";
import { Favourite } from "@/components/favourite";
import Header from "@/components/header";
import OthersBook from "@/components/othersBook";
import { Review } from "@/components/review";
import Image from "next/image";

export default function Home() {
  return (
   <main>
    <Header/>
    <BestSelling/>
    <Favourite/>
    <OthersBook/>
    <Review/>
    
   </main>
  );
}
