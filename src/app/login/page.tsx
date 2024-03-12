'use client'
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';


import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

type User=any;

export default function Login() {
    const router = useRouter();
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email,password)
        console.log(auth)
        try {
          const res = await axios.post("https://read-realm-server.vercel.app/auth/login", {
            email,
            password,
          });
    
          if (res && res.data.success) {
            const userData: User = res.data.user; // Adjust this based on the structure of your user object
            toast.success(res.data.message);
            setAuth({
              ...auth,
              user: userData,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            
            router.push("/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      };
    
  return (
    <section className="bg-gray-100">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <ToastContainer />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign in to your account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="rafiul@gmail.com" />
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " />
                            </div>
                            <div className="ml-3 text-sm">
                              <label  className="text-gray-500 ">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}
