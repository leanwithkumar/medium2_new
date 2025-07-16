import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Landingpage from '../Firstpage';

function FirstHeader() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="w-full border-b border-gray-300">
      <div className="flex justify-between items-center md:px-25 py-5 pl-10">
        <Link to={'/'} element={<Landingpage/>}>
        <div>
          <img 
            src="/Medium2.png"
            width="200" 
            height="50" 
            className="max-w-full h-auto"
            alt="Logo"
          />
        </div>
        </Link>
        

        
        <div className="hidden md:flex flex-wrap justify-center gap-4 p-2 text-base sm:text-lg md:text-xl">
         <Link to={'/ourstory'}><div className="px-2  hover:underline cursor-pointer">Our Story</div></Link> 
          <Link to={'/write'}><div className="px-2  hover:underline cursor-pointer">Write</div></Link>
          <Link to={'/signin'}><div className="px-2  hover:underline cursor-pointer">Signin</div></Link>
          <Link to={'/signup'}><div className="px-2  hover:underline cursor-pointer">Signup</div></Link>
        </div>

        
        <div className="md:hidden pr-10">
          <button 
            className="text-3xl font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776;
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 px-10 pb-4 text-base sm:text-lg">
          <Link to={'/ourstory'}><div className="px-2  hover:underline cursor-pointer">Our Story</div></Link> 
          <Link to={'/write'}><div className="px-2  hover:underline cursor-pointer">Write</div></Link>
          <Link to={'/signin'}><div className="px-2  hover:underline cursor-pointer">Signin</div></Link>
          <Link to={'/signup'}><div className="px-2  hover:underline cursor-pointer">Signup</div></Link>
          
        </div>
      )}
    </div>
  );
}

export default FirstHeader