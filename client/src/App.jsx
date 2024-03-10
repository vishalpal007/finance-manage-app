import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './component/Protected'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Navbar from './component/Navbar'

const App = () => {
  return <>
    <BrowserRouter>
      <ToastContainer
        position='bottom-left'
      />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<><Navbar /><Outlet /></>}>
          <Route index element={<Protected compo={<Home />} />} />
        </Route>


        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App