import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";
import { AuthContext } from "../components/context/AuthProvider";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const {setIsAuthenticated} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post(
      `${BASE_URL}/api/token/`,
      {
        username: formData.username,
        password: formData.password,
      }
    );

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    setIsAuthenticated(true);

    console.log("Login successful:", response.data);

    navigate("/profile", { replace: true });
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <FaSignInAlt className="text-2xl text-white" />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your KatheShop account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Username */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}