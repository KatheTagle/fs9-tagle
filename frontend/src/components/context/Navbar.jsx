import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  // Check login status whenever the navbar loads
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen for changes from other tabs/windows
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    // Remove refresh token too if you have one
    localStorage.removeItem("refresh_token");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav className="bg-[#10275e] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          My Shop
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          {/* Always visible */}
          <Link
            to="/"
            className="transition hover:text-gray-300"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="transition hover:text-gray-300"
          >
            Products
          </Link>

          {/* ========================= */}
          {/* NOT LOGGED IN */}
          {/* ========================= */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="transition hover:text-gray-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-white px-4 py-2 font-semibold text-[#10275e] transition hover:bg-gray-200"
              >
                Register
              </Link>
            </>
          )}

          {/* ========================= */}
          {/* LOGGED IN */}
          {/* ========================= */}
          {isLoggedIn && (
            <>
              <Link
                to="/cart"
                className="transition hover:text-gray-300"
              >
                Cart
              </Link>

              <Link
                to="/profile"
                className="transition hover:text-gray-300"
              >
                Profile
              </Link>

              <Link
                to="/purchase-history"
                className="transition hover:text-gray-300"
              >
                Purchase History
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;