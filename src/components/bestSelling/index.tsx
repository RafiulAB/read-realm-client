import React, { useEffect, useState } from 'react'
import BookCard from '../bookCard';
import { Book } from '@/utils';

const BestSelling:React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch('https://read-realm-server.vercel.app/books/get-all')
                
                const result:any = await response.json();
                
           
               setBooks(result.books)
               setLoading(false)
            } catch (error) {
                console.log(error)
            }

        };

        fetchData()
    },[books])

  return (
    <div>
        <BookCard books={books} loading={loading} heading="Best Selling Books"/>
    </div>
  )
}

export default BestSelling;