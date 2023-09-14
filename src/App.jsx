// import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/DetailEvent";
import Profile from "./pages/Profile";
import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ManageEvent from "./pages/ManageEvent";
import SelectSection from "./pages/SelectSection";
import Payment from "./pages/Payment";
import MyBooking from "./pages/MyBooking";
import MyWishlist from "./pages/MyWishlist";

import { store, persistor } from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/event-detail/:id" element={<Details />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manage-event" element={<ManageEvent />} />
            <Route
              path="/select-section/:id"
              element={
                <PrivateRoute>
                  <SelectSection />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/mybooking"
              element={
                <PrivateRoute>
                  <MyBooking />
                </PrivateRoute>
              }
            />
            <Route
              path="/mywishlist"
              element={
                <PrivateRoute>
                  <MyWishlist />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
