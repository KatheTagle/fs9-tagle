import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/register/`, {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
});

      setSuccess("Registration successful! You can now log in.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Registration failed."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-6xl">

        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-slate-50 px-8 py-12 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-6">
            <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
              Network Switches
            </span>
          </div>

          <h1 className="max-w-md text-5xl font-bold leading-[1.05] text-slate-950">
            Switch on the
            <br />
            power of your
            <br />
            network
          </h1>

          <p className="mt-6 max-w-md text-sm leading-6 text-slate-600">
            Your network needs to evolve to meet new demands. So do
            your switches.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/products"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              View Latest Devices
            </Link>
          </div>

          <div className="mt-7 h-px w-full max-w-md bg-slate-200" />

          <div className="mt-6 flex max-w-md justify-between">
            <div>
              <p className="text-xl font-bold text-slate-950">20K+</p>
              <p className="text-xs text-slate-500">Customers</p>
            </div>

            <div>
              <p className="text-xl font-bold text-slate-950">500+</p>
              <p className="text-xs text-slate-500">Products</p>
            </div>

            <div>
              <p className="text-xl font-bold text-slate-950">4.9</p>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md">

            <h2 className="mb-8 text-center text-2xl font-bold text-slate-950">
              Register
            </h2>

            <form
              className="space-y-5"
              onSubmit={handleRegister}
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <span className="text-red-500">*</span> Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="h-11 w-full border border-slate-200 bg-slate-100 px-4 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <span className="text-red-500">*</span> Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="h-11 w-full border border-slate-200 bg-slate-100 px-4 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <span className="text-red-500">*</span> Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="h-11 w-full border border-slate-200 bg-slate-100 px-4 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <span className="text-red-500">*</span> Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-11 w-full border border-slate-200 bg-slate-100 px-4 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <span className="text-red-500">*</span> Confirm password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="h-11 w-full border border-slate-200 bg-slate-100 px-4 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-green-600">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="mt-3 h-12 w-full bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;