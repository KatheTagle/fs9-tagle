import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AuthContext } from "./context/AuthProvider";

function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-500 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">
          KATHESHOP
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          <Link
            to="/"
            className="rounded-lg border border-black px-5 py-2 font-medium text-white transition hover:bg-gray-700"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="rounded-lg border border-black px-5 py-2 font-medium text-white transition hover:bg-gray-700"
          >
            Product
          </Link>

          <Link
            to="/team"
            className="rounded-lg border border-black px-5 py-2 font-medium text-white transition hover:bg-gray-700"
          >
            Team
          </Link>
        </nav>

        {/* Desktop Authentication Buttons */}
        <div className="hidden items-center gap-3 md:flex">

          {/* NOT LOGGED IN */}
          {!isAuthenticated && (
            <>
              <Link
                to="/register"
                className="rounded-lg border border-black px-5 py-2 font-medium text-white transition hover:bg-gray-700"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-black px-5 py-2 font-medium text-white transition hover:bg-gray-700"
              >
                Login
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {isAuthenticated && (
            <>
              <Link
                to="/cart"
                className="rounded-lg p-2 text-white transition hover:bg-gray-700"
                title="Shopping Cart"
              >
                <FaShoppingCart className="text-2xl" />
              </Link>

              <Link
                to="/profile"
                className="rounded-lg p-2 text-white transition hover:bg-gray-700"
                title="Profile"
              >
                <FaUser className="text-2xl" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-3xl text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col px-6 py-4">

            <Link
              to="/"
              className="py-2 font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/products"
              className="py-2 font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Product
            </Link>

            <Link
              to="/team"
              className="py-2 font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>

            {/* Mobile - NOT LOGGED IN */}
            {!isAuthenticated && (
              <div className="mt-4 flex flex-col gap-3">

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-indigo-600 py-2 text-center font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-indigo-600 py-2 text-center font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Login
                </Link>

              </div>
            )}

            {/* Mobile - LOGGED IN */}
            {isAuthenticated && (
              <div className="mt-4 flex flex-col gap-3">

                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg border border-indigo-600 px-4 py-2 font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  <FaShoppingCart />
                  Cart
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg border border-indigo-600 px-4 py-2 font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  <FaUser />
                  Profile
                </Link>

              </div>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;