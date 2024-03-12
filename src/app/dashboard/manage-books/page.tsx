"use client";
import Loading from "@/components/loading";
import Paginations from "@/components/pagination";
import { useAuth } from "@/context/authContext";

import { Book } from "@/utils";
import { bookGetFunc } from "@/utils/apiCalls";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageProduct() {
  const auth = useAuth()
  const token = auth[0].token
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);



  const bookGet = async () => {
    const response = await bookGetFunc(search, category, page);

    if (response) {
      setBooks(response.data.books);
      setPageCount(response.data.Pagination.pageCount);
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
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  
  // handle delete
  const handleDelete = async (Id:{Id:any}) => {
    try {
     
      // Send a request to delete the book with the specified ID
      await fetch(`https://read-realm-server.vercel.app/books/delete/${Id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // If deletion is successful, update the books state to remove the deleted book
      setBooks(books.filter(book => book._id !== Id));
      toast.success('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Error deleting book');
      // Handle error
    }
  };

  useEffect(() => {
    bookGet();
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [page,handleDelete]);
  return (
    <div className=" m-6">
      <h1 className="text-center text-2xl font-bold">Manage Your Books</h1>

      <ToastContainer />
      {/* books container */}
      <div>
        {loading ? (
          <>
            {" "}
            <Loading />{" "}
          </>
        ) : (
          <div className="flex flex-wrap pt-12 gap:2 lg:gap-4 justify-between ">
            {books?.map((book) => (
              <div
                key={book._id}
                className="mb-12 w-full lg:w-1/5 p-4 rounded shadow-md bg-gray-100 "
              >
                <div>
                  <div className="relative">
                    <img
                      src={book.image}
                      alt="bookimg"
                      className="w-48 lg:max-h-72  p-2"
                    />
                  </div>
                  <div className=" p-2">
                    <h3 className="font-medium">{book.name}</h3>
                  </div>
                  <div className="flex flex-wrap justify-between px-2">
                    <button className="text-white bg-blue-800 p-2 rounded-md hover:bg-blue-600">
                     
                      <a href={`/dashboard/manage-books/${book._id}`}> update</a>
                    </button>

                    <div className=" bg-red-600 hover:bg-red-400 p-2 rounded">
                      <button onClick={()=>handleDelete(book._id)}>
                        <MdDelete className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="my-4">
          <Paginations
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
