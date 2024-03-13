'use client'
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { Select } from "flowbite-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  author: string;
  image: string;
  category: string;
  desc: string;
  price: string;
  file: string;
}


export default function Create() {
  const auth = useAuth()
  const token = auth[0].token
 
  const [formData, setFormData] = useState<FormData>({
    name: "",
    author: "",
    image: "",
    category: "All",
    desc: "",
    price: "",
    file: ""
  });
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
   
      const response:any = await fetch("https://read-realm-server.vercel.app/books/create", {
        method:"POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          author: "",
          desc: "",
          category: "all",
          image: "",
          price: "",
          file: ""
        });
        toast.success('Book created successfully');
      }

    } catch (error) {
      console.error("Error sending data to the server:", error);
      // Handle error, show user feedback, etc.
    }
    

  };


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">Upload A Book</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="my-4 p-2 lg:p-6 flex flex-wrap gap-2 lg:gap-8">
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Book Title
        </label>
        <input
          type="text"
          placeholder="Book Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-96 p-2.5 "
        />
      </div>
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
        Author Name
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Rafiul Alam"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-96 p-2.5 "
        />
      </div>
      
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          image url
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://.."
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-96 p-2.5 "
        />
      </div>
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Select A Category
        </label>
        <Select 
        id="catecories"
        name="category"
          value={formData.category}
          onChange={handleChange}
        className="w-full lg:w-96"
        required>
        <option>Romance</option>
        <option>Fiction</option>
        <option>Horor</option>
        <option>Nobel</option>
      </Select>
      </div>
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
         Description
        </label>
        <textarea 
        name="desc"
          value={formData.desc}
          onChange={handleChange}
        id="" cols={95} rows={4}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          Description
        </textarea>
      </div>
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
        Price
        </label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="$ 0.00"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-96 p-2.5 "
        />
      </div>
      <div >
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
        PDF url
        </label>
        <input
          type="text"
          name="file"
          value={formData.file}
          onChange={handleChange}
          placeholder="https://"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-96 p-2.5 "
        />
      </div>
        <div className="inline-block items-end">

      <button  type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-800">Upload Book</button>
        </div>
     
      </form>
    </div>
  );
}
