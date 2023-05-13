// import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import Home from "./pages/Home"
import Details from "./pages/DetailEvent"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"

import {store} from './redux/store'

const App = ()=> {
  
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/event-detail/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
            
          
        </Routes>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App