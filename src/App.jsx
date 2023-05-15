// import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import Home from "./pages/Home"
import SearchResults from "./pages/SearchResults"
import Details from "./pages/DetailEvent"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import ManageEvent from "./pages/ManageEvent"

import {store, persistor} from "./redux/store"
import PrivateRoute from "./components/PrivateRoute"
import { PersistGate } from "redux-persist/integration/react"

const App = ()=> {
  
  return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/event-detail/:id" element={<Details />} />
            <Route path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manage-event" element={<ManageEvent />} />
            
          
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    
  )
}

export default App
