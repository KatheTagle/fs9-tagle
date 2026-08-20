import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from "react";

import Hero from "./pages/Hero";
import Products from "./pages/Products";
import PartnerCarousel from "./components/PartnerCarousel";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import Cart from "./components/Cart.jsx";

import Checkout from "./components/context/Checkout.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";
import PurchaseHistory from "./components/context/PurchaseHistory.jsx";

import { AuthProvider } from "./components/context/AuthProvider";
import { PrivateRoute } from "./components/context/PrivateRoute";

import "./App.css";

function App() {
  return (
    <>
      <Router>

        <ScrollToTop />

        <AuthProvider>

          <Header />

          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Hero />}
            />

            {/* Products */}
            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            {/* Authentication */}
            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />

            {/* Checkout Success */}
            <Route
              path="/checkout-success"
              element={<CheckoutSuccess />}
            />
            <Route
              path="/purchase-history"
              element={
                <PrivateRoute>
                  <PurchaseHistory />
                </PrivateRoute>
  }
/>

          </Routes>

          <PartnerCarousel />
          <Footer />

        </AuthProvider>

      </Router>
    </>
  );
}

export default App;
