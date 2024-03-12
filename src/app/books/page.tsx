"use client";
import { BookCardProps } from "@/components/bookCard";
import Loading from "@/components/loading";
import Paginations from "@/components/pagination";
import Pagination from "@/components/pagination";
import { Book } from "@/utils";
import { bookGetFunc } from "@/utils/apiCalls";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";

const Books: React.FC<BookCardProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount,setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  console.log(books)
  const bookGet = async () => {
    const response = await bookGetFunc(search, category, page);

    if (response) {
      setBooks(response.data.books);
      setPageCount(response.data.Pagination.pageCount)
      //   setPageCount(response.data.Pagination.pageCount)
    } else {
      console.log("error for get user data");
    }
  };

  const handleOptionChange = (event: any) => {
    setCategory(event.target.value);
  };

   // pagination
  // handle prev btn
  const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }

  useEffect(() => {
    bookGet();
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [search, category, page]);

  return (
    <div className="lg:m-12 lg:p-6">
      <h1 className="text-xl text-center mb-4 lg:mb-12 lg:text-4xl font-bold">
            Find Your <span className="text-blue-800">
            Favourite  Book Here
            </span>
          </h1>
      <div className="flex flex-row gap-2 mr-6 mb-4 lg:mb-8">
      <div className="inline-block relative">
          <select
            value={category}
            onChange={handleOptionChange}
            className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring focus:ring-gray-200  focus:border-blue-300"
          >
            <option value="">All Categories</option>
            <option value="romance">Romance</option>
            <option value="Fiction">Fiction</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-white">
            <IoIosArrowDropdown className="h-6" />
          </div>
        </div>    
<form >   
    <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={(e)=>{setSearch(e.target.value)}} id="default-search" className="block  p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-100 focus:border-blue-500 " placeholder="Search For Books..." required />
    </div>
</form>


      </div>
      
      
      {
        loading?(<> <Loading/> </> ):(
          <div className="flex flex-wrap gap:2 lg:gap-4 justify-between ">
        {books?.map((book) => (
          <div  key={book._id} className="mb-12 w-full lg:w-1/5 p-6 rounded shadow-md bg-gray-100 hover:bg-slate-300 hover:transition delay-150">
          <Link href={`/books/${book._id}`}>
                            <div className='relative'>
                                <img 
                                src={book.image} 
                                alt="bookimg"
                                className='w-48 lg:max-h-72  p-2'
                                />
                                
                            </div>
                            <div className=' p-2'>
                                <h3 className='font-medium'>{book.name}</h3>
                                 
                            </div>
                            <div className="flex flex-wrap justify-between p-2">
                              <p className="text-gray-800 ">${book.price}</p>
                              <div className='top-3 right-3 bg-blue-600 p-2 mx-4 rounded'>
                                <FaShoppingCart className='w-4 h-4 text-white'/>
                              </div>
                            </div>
                            </Link>
        </div>
        ))}
      </div>
        )
      }
      <div className="my-4">
         <Paginations handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}/>
      </div>
    </div>
  );
};

export default Books;
