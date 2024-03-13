'use client'
import { useAuth } from '@/context/authContext';
import { Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
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

export default function Update({ params }: { params: { id: string } }) {
    const initialFormData: FormData = {
        name: '',
        author: '',
        image: '',
        category: 'Romance',
        desc: '',
        price: '',
        file: ''
      };
      const [formData, setFormData] = useState<FormData>(initialFormData);
      const auth = useAuth()
      const token = auth[0].token

      const fetchProductDetails = async () => {
        try {
          
          const response = await fetch(`https://read-realm-server.vercel.app/books/${params.id}`);
          if (response.ok) {
            const productData = await response.json();
           console.log(productData)
            setFormData(productData.books);
          } else {
            console.error('Failed to fetch product details');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        try {
          // Here you would make your HTTP request to your backend to update the data
          const response = await fetch(`https://read-realm-server.vercel.app/books/update/${params.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Handle success
            toast.success('Book updated successfully');
            setFormData(initialFormData)
          } else {
            // Handle errors
            console.error('Failed to update data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      useEffect(() => {
        
        fetchProductDetails();
      }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">Update Book</h1>
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
      <div className="w-1/4 flex justify-end items-end"> 
          <button type="submit" className="bg-blue-600  text-white rounded px-4 py-2 hover:bg-blue-800 block w-full">
            Update book
          </button>
        </div>
     
      </form>
    </div>
  )
}
