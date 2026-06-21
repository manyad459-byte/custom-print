import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./component/Navbar";
import Welcome from "./pages/Welcome";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Customize from "./pages/Customize";
import MyDesigns from "./pages/MyDesigns";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Success from "./pages/Success";
import TrackOrder from "./pages/TrackOrder";
function AppContent() {
  const [showWelcome, setShowWelcome] = useState(false);
  const location = useLocation();

  // existing login check (unchanged)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // user role
  const user = JSON.parse(localStorage.getItem("user"));

  const hideNavbarRoutes = ["/login", "/admin", "/customize"];

  // ✅ FIX: required for Customize page
  const [designs, setDesigns] = useState([]);
  const [showStudio, setShowStudio] = useState(true);

  const addToCart = (item) => {
    console.log("Added to cart:", item);
  };

  return (
    <>
      {showWelcome ? (
        <Welcome onFinish={() => setShowWelcome(false)} />
      ) : (
        <>
          {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
            />

            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/my-designs" element={<MyDesigns />} />
            <Route path="/profile" element={<Profile />} />
           <Route path="/customize" element={<Customize />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/track-order" element={<TrackOrder />} />
            {/* ADMIN PROTECTED ROUTE */}
            <Route
              path="/admin"
              element={
                isLoggedIn && user?.role === "admin"
                  ? <Admin />
                  : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default function App() {
  return <AppContent />;
}