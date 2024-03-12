'use client'
import Sidebar from "@/components/Dashboard/sidebar"
import Loading from "@/components/loading";
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function DashboardLayout({
    children,}: {
    children: React.ReactNode
  }) {
    const [auth,setAuth]= useAuth();
    const router = useRouter()

    const Role = auth?.user?.role;
    
    
  

    return (
      
      <>
      {
        Role =='admin'? <div>
<section className="m-2 p-2 lg:mx-12 flex gap-4">
        {/* Include shared UI here e.g. a header or sidebar */}
        
        <Sidebar/>
   
        {children}
   
      </section>
        </div> : <div>
          <Loading/>
        </div>
      }
      </>
      
    )
  }