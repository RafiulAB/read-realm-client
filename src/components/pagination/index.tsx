import React from 'react'
import { Pagination } from 'flowbite-react';

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }:any) => {
    const renderPageButtons = () => {
        const buttons = [];
    
        for (let i = 1; i <= pageCount; i++) {
          buttons.push(
            <button key={i} onClick={() => setPage(i)} 
            className={`px-4 py-2 mx-1 focus:outline-none ${
                i === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              {i}
            </button>
          );
        }
    
        return buttons;
      };
  return (
    <div className="pagination flex items-center justify-center space-x-2 mt-4">
      <button 
      onClick={handlePrevious} 
      className={`px-4 py-2 focus:outline-none ${page <= 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
       disabled={page <= 1}>
        Previous
      </button>
      {renderPageButtons()}
      <button onClick={handleNext} disabled={page >= pageCount}
      className={`px-4 py-2  focus:outline-none ${page >= pageCount ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Next
      </button>
    </div>
  )
}

export default Paginations;