import { Book } from '@/utils';
import React, { useEffect, useState } from 'react'
import BookCard from '../bookCard';

const OthersBook: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    

    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch('https://read-realm-server.vercel.app/books/get-all')
                const result:any = await response.json();
                const data = result.books.splice(2,15)
               setBooks(data)
               setLoading(false)
            } catch (error) {
                console.log(error)
            }

        };

        fetchData()
    },[])
  return (
    <div>
        <BookCard books={books} loading={loading} heading="Others Book"/>
    </div>
  )
}

export default OthersBook