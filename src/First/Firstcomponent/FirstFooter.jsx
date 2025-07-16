import React from 'react';
import { Link } from 'react-router-dom';

function FirstFooter() {
  return (
    <>
    
    <div className="w-full border-t border-gray-300 mt-10">
      <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-600 py-6">
        <Link to={'help'}><div className="cursor-pointer hover:underline">Help</div></Link>
        <Link to={'privacy'}><div className="cursor-pointer hover:underline">Privacy</div></Link>
        <Link to={'rules'}><div className="cursor-pointer hover:underline">Rules</div></Link>
        <Link to={'terms'}><div className="cursor-pointer hover:underline">Terms</div></Link>
        <Link to={'contact'}><div className="cursor-pointer hover:underline">Contact</div></Link>

        
      </div>
    </div>
    </>
    
  );
}

export default FirstFooter;
