import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/base";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
  });

  // =========================
  // GET CART
  // =========================
  const getCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      setError("Please log in first.");
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/api/cart/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CART:", response.data);

      setCartItems(response.data);
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error.response?.data || error.message
      );

      setError("Unable to load your cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error while typing
    setError("");
  };

  // =========================
  // CALCULATE TOTAL
  // =========================
  const subTotal = cartItems.reduce(
    (total, item) => {
      return (
        total +
        Number(item.product_price) *
          Number(item.quantity)
      );
    },
    0
  );

  const total = subTotal;

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please log in first.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setCheckoutLoading(true);

    try {
      // Debug - see exactly what is being submitted
      console.log("SHIPPING FORM:", formData);

      const response = await axios.post(
        `${BASE_URL}/api/checkout/`,
        {
          fullname: formData.fullname,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postal_code,
          country: formData.country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "CHECKOUT RESPONSE:",
        response.data
      );

      // =========================
      // GO TO XENDIT
      // =========================
      if (response.data.invoice_url) {
        window.location.href =
          response.data.invoice_url;
        return;
      }

      setError(
        "Payment invoice was not created."
      );
    } catch (error) {
      console.error(
        "CHECKOUT ERROR:",
        error.response?.data || error.message
      );

      if (error.response?.data) {
        const backendError =
          error.response.data;

        if (
          typeof backendError === "object"
        ) {
          const messages = Object.entries(
            backendError
          ).map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(", ")}`;
            }

            return `${key}: ${value}`;
          });

          setError(messages.join(" | "));
        } else {
          setError(String(backendError));
        }
      } else {
        setError(
          "Unable to connect to the checkout server."
        );
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center">
        <h1 className="text-xl font-semibold">
          Loading checkout...
        </h1>
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-white py-10">
      <div className="mx-auto w-full max-w-5xl px-4">

        <h1 className="mb-8 text-3xl font-bold text-black">
          Checkout
        </h1>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">

          {/* ================================= */}
          {/* SHIPPING FORM */}
          {/* ================================= */}

          <div className="border border-gray-200 bg-white p-8 shadow-md">

            <h2 className="mb-6 text-2xl font-bold">
              Shipping Information
            </h2>

            <form
              onSubmit={handleCheckout}
              noValidate={false}
            >

              {/* FULL NAME */}
              <div className="mb-5">

                <label
                  htmlFor="fullname"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />

              </div>

              {/* ADDRESS */}
              <div className="mb-5">

                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold"
                >
                  Shipping Address
                </label>

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your shipping address"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />

              </div>

              {/* CITY */}
              <div className="mb-5">

                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />

              </div>

              {/* POSTAL CODE */}
              <div className="mb-5">

                <label
                  htmlFor="postal_code"
                  className="mb-2 block text-sm font-semibold"
                >
                  Postal Code
                </label>

                <input
                  id="postal_code"
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />

              </div>

              {/* COUNTRY */}
              <div className="mb-6">

                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-semibold"
                >
                  Country
                </label>

                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full rounded-lg bg-[#10275e] py-3 text-sm font-semibold text-white transition hover:bg-[#0c1d47] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checkoutLoading
                  ? "Processing..."
                  : "Proceed to Payment"}
              </button>

            </form>
          </div>

          {/* ================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================= */}

          <div className="h-fit border border-gray-200 bg-white p-8 shadow-md">

            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500">
                Your cart is empty.
              </p>
            ) : (
              <div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-200 py-4"
                  >

                    <div>

                      <h3 className="text-sm font-semibold">
                        {item.product_name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Price: ₱
                        {Number(
                          item.product_price
                        ).toFixed(2)}
                      </p>

                    </div>

                    <p className="text-sm font-semibold">
                      ₱
                      {(
                        Number(
                          item.product_price
                        ) *
                        Number(item.quantity)
                      ).toFixed(2)}
                    </p>

                  </div>
                ))}

                {/* SUBTOTAL */}
                <div className="mt-6 flex justify-between border-b border-gray-300 pb-5 text-sm font-semibold">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₱{subTotal.toFixed(2)}
                  </span>

                </div>

                {/* TOTAL */}
                <div className="flex justify-between pt-5 text-lg font-bold">

                  <span>
                    Total
                  </span>

                  <span>
                    ₱{total.toFixed(2)}
                  </span>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;