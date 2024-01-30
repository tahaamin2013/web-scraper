import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
   <div className='flex flex-row justify-center gap-2.5 sm:gap-5 bg-white py-2 text-[14px] sm:text-[15px] border-b'>
    <Link href="/">Packages Scraper</Link> <p className='text-[10px] sm:text-[15px] text-gray-800 flex items-center'>|</p>
    <Link href="amazon">Amazon Scraper</Link>  <p className='text-[10px] sm:text-[15px] text-gray-800 flex items-center'>|</p>
    <Link href="book-scraper">Book Scraper</Link>
   </div>
  )
} 

export default Navbar