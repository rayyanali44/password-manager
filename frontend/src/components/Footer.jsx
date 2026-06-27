import React from 'react'
import { FaRegHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-purple-950 flex flex-col w-full items-center text-white'>
        <div className="logo text-lg font-bold">
            <span className='text-green-400'>&lt;</span>PMUltra<span className='text-green-400'>/&gt;</span>
        </div>
        <p className='flex items-center gap-2 text-sm'>Made with<FaRegHeart/>by RayyanPapa</p>
    </footer>
  )
}

export default Footer
