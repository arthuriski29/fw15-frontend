// import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Details from "./pages/DetailEvent"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"

const App = ()=> {
  
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/details" element={<Details />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
        
      
    </Routes>
    </BrowserRouter>
    
  )
}

export default App