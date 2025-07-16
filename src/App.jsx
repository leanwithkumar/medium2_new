import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Firstpage from './First/Firstpage'
import Landinghero from './First/Firstpages/Landinghero'
import Signup from './First/Firstpages/Signup'
import Ourstory from './First/Firstpages/Ourstroy'
import Signin from './First/Firstpages/Signin'
import Write from './First/Firstpages/Write'
import Help from './First/Firstpages/Help'
import Privacy from './First/Firstpages/Privacy'
import Rules from './First/Firstpages/Rules'
import Contact from './First/Firstpages/Contact'
import Terms from './First/Firstpages/Terms'
import Secondpage from './Second/Secondpage'
import Trending from './Second/Secondpages/Trending'
import Profile from './Second/Secondpages/Profile'
import Publish from './Second/Secondpages/Publish'
import Readblog from './Second/Secondpages/Readblog'
import EditBlog from './Second/Secondpages/Editblog'
import Search from './Second/Secondpages/Search'
import PrivateRoute from './Second/PrivateRoute'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Firstpage/>}>
      <Route index element={<Landinghero/>}/>
      <Route path='/ourstory' element={<Ourstory/>}/>
      <Route path='/write' element={<Write/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='/rules' element={<Rules/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/terms' element={<Terms/>}/>
      </Route>

      <Route element={<PrivateRoute/>}>
      <Route path='/medium2' element={<Secondpage/>}>
      <Route index element={<Trending/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='readblog/:blogid' element={<Readblog/>}/>
      <Route path='editblog/:blogid' element={<EditBlog/>}/>
      <Route path='search' element={<Search/>}/>
      </Route>
      <Route path='/publish' element={<Publish/>}/>
      </Route>



    </Routes>



    </>
  )
}

export default App
