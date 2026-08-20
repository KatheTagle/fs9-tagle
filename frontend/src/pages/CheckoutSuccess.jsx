import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="mx-auto max-w-xl px-4 text-center">

        <div className="border border-gray-200 bg-white p-10 shadow-md">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl text-green-600">
              ✓
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-black">
            Payment Successful!
          </h1>

          {/* Message */}
          <p className="mb-8 text-gray-600">
            Thank you for your purchase. Your payment has
            been successfully completed.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4">

            <Link
              to="/login"
              className="w-full rounded-lg bg-[#10275e] py-3 text-sm font-semibold text-white transition hover:bg-[#0c1d47]"
            >
              Back to Login
            </Link>

            <Link
              to="/"
              className="w-full rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutSuccess;