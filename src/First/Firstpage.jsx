import React from 'react'
import FirstHeader from './Firstcomponent/FirstHeader'
import { Outlet } from 'react-router-dom'
import FirstFooter from './Firstcomponent/FirstFooter'

function Firstpage() {
  return (
   <>
   <FirstHeader/>
   <Outlet/>
   <FirstFooter/>
   </>
  )
}

export default Firstpage
