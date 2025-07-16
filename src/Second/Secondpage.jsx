import React from 'react'
import Secondheader from './Secondcomponent/Secondheader'
import { Outlet } from 'react-router-dom'

function Secondpage() {
  return (
    <>
    <Secondheader/>
    <div className='md:ml-30 md:mr-100 my-10 border-l-2 border-r-2'>
     <div className='md:px-10 px-2'>

      <Outlet/>
     
     </div>
      

    </div>

    </>
  )
}

export default Secondpage
