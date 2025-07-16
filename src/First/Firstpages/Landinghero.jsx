import React from 'react'
import { Link } from 'react-router-dom'

function Landinghero() {
  return (
    <>
     
    <div className="h-screen md:px-10 px-5 pt-5">
    
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
    
    
    <div className="max-w-full md:w-1/2">
      <img
        src="/resilienza-1.jpg"
        alt="picture"
        className="w-full h-auto rounded"
      />
    </div>

   
    <div className="md:w-1/2 px-8">
      <p className="text-xl md:text-4xl font-mono text-gray-800 break-words text-left md:text-left">
        {`function medium2{ `}<br/>
        {`console.log("your words")`}<br/>
        {`}`}
        
      </p>
      <br/>
      <p className="text-xl md:text-2xl font-mono text-gray-800 break-words text-left md:text-left">
      read, write and understand things better
      </p><br/>
      <p className="text-xl hover:underline md:text-xl font-mono text-gray-800 break-words text-left md:text-left">
        <Link to='/signup'>click here and get stared</Link>
      </p>
    </div>

  </div>
</div>

    </>
  )
}

export default Landinghero
