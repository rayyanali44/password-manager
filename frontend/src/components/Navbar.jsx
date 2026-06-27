import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-950 flex justify-around text-white p-3 items-center'>
        <div className="logo text-2xl font-bold">
            <span className='text-green-400'>&lt;</span>PMUltra<span className='text-green-400'>/&gt;</span>
        </div>
        <div className="github">
          <img className='w-25 rounded-full cursor-pointer hover:scale-105 transition-all duration-300' src="src/github.png" alt="" />
        </div>
    </nav>
  )
}

export default Navbar
