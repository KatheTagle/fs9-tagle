
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/base";

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  if (image.startsWith("/images/")) {
    return `${BASE_URL}${image}`;
  }

  return `${BASE_URL}/images/${image}`;
};

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET CART
  // =========================
  const getCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please log in to view your cart.");
      setLoading(false);
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

      setCartItems(response.data);

      console.log(
        "CART DATA:",
        JSON.stringify(response.data, null, 2)
      );
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          "Unable to load cart."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = () => {
    const token = localStorage.getItem("access_token");

    setError("");

    if (!token) {
      setError("Please log in first.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Go to checkout page first.
    // The checkout page will collect shipping information
    // and then call /api/checkout/.
    navigate("/checkout");
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please log in first.");
      return;
    }

    setError("");

    try {
      console.log(
        "Updating cart:",
        cartId,
        newQuantity
      );

      // IMPORTANT:
      // Backend route is:
      // PUT /api/cart/<id>/
      const response = await axios.put(
        `${BASE_URL}/api/cart/${cartId}/`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "UPDATE RESPONSE:",
        response.data
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartId
            ? {
                ...item,
                quantity: response.data.quantity,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to update quantity:",
        error.response?.status,
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          "Unable to update quantity."
      );
    }
  };

  // =========================
  // DELETE CART ITEM
  // =========================
  const deleteCartItem = async (cartId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please log in first.");
      return;
    }

    setError("");

    try {
      await axios.delete(
        `${BASE_URL}/api/cart/delete/${cartId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove item from screen immediately
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) => item.id !== cartId
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete cart item:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          "Unable to remove item from cart."
      );
    }
  };

  // =========================
  // CALCULATE SUBTOTAL
  // =========================
  const subTotal = cartItems.reduce(
    (total, item) => {
      const price = Number(item.product_price);
      const quantity = Number(item.quantity);

      return total + price * quantity;
    },
    0
  );

  const total = subTotal;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center">
        <h1 className="text-xl font-semibold">
          Loading cart...
        </h1>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white px-4 py-20 text-center">
        <p className="font-semibold text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mt-6 rounded-lg bg-[#10275e] px-6 py-3 font-semibold text-white transition hover:bg-[#0c1d47]"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // =========================
  // MAIN
  // =========================
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto w-full max-w-3xl px-4">

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* =========================
            SHOPPING CART
        ========================= */}
        <div className="border border-gray-200 bg-white px-8 py-10 shadow-md">

          <h1 className="mb-6 text-3xl font-bold text-black">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="py-10 text-center">

              <p className="text-gray-500">
                Your cart is empty.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-6 rounded-lg bg-[#10275e] px-6 py-3 font-semibold text-white transition hover:bg-[#0c1d47]"
              >
                Continue Shopping
              </button>

            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-500 py-5"
                >

                  {/* =========================
                      PRODUCT
                  ========================= */}
                  <div className="flex items-center gap-8">

                    {/* Product Image */}
                    <div className="flex h-16 w-24 items-center justify-center">
                      <img
                        src={getImageUrl(
                          item.product_image
                        )}
                        alt={item.product_name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Information */}
                    <div>

                      <h2 className="text-sm font-semibold text-black">
                        {item.product_name}
                      </h2>

                      {/* Quantity */}
                      <div className="mt-2 flex items-center gap-3 text-base">

                        <span>
                          Qty:
                        </span>

                        {/* Minus */}
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Number(item.quantity) - 1
                            )
                          }
                          disabled={
                            Number(item.quantity) <= 1
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-lg font-bold transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        {/* Quantity */}
                        <span className="min-w-[25px] text-center font-semibold">
                          {item.quantity}
                        </span>

                        {/* Plus */}
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Number(item.quantity) + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-lg font-bold transition hover:bg-gray-300"
                        >
                          +
                        </button>

                      </div>

                      {/* Price */}
                      <p className="mt-1 text-base font-medium">
                        Price: $
                        {Number(
                          item.product_price
                        ).toFixed(2)}
                      </p>

                      {/* Item Total */}
                      <p className="mt-1 text-base font-semibold">
                        Item Total: $
                        {(
                          Number(
                            item.product_price
                          ) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </p>

                    </div>
                  </div>

                  {/* =========================
                      DELETE
                  ========================= */}
                  <button
                    type="button"
                    onClick={() =>
                      deleteCartItem(item.id)
                    }
                    title="Remove from cart"
                    className="ml-6 flex h-9 w-9 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <FaTrash className="text-sm" />
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}
        {cartItems.length > 0 && (
          <div className="mt-10 border border-gray-100 bg-white px-8 py-8 shadow-md">

            <h2 className="mb-7 text-center text-3xl font-bold text-black">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="mb-6 border-b border-gray-400 pb-6">

              {cartItems.map((item) => {
                const price = Number(
                  item.product_price
                );

                const quantity = Number(
                  item.quantity
                );

                const itemTotal =
                  price * quantity;

                return (
                  <div
                    key={item.id}
                    className="mb-4 flex items-center justify-between"
                  >

                    <div>
                      <p className="text-base font-semibold text-black">
                        {item.product_name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {quantity} × $
                        {price.toFixed(2)}
                      </p>
                    </div>

                    <p className="text-base font-semibold text-black">
                      ${itemTotal.toFixed(2)}
                    </p>

                  </div>
                );
              })}

            </div>

            {/* Sub Total */}
            <div className="flex items-center justify-between border-b border-gray-400 px-4 pb-6 text-base font-semibold">
              <span>
                Sub Total
              </span>

              <span>
                ${subTotal.toFixed(2)}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-6 text-base font-semibold">
              <span>
                Total
              </span>

              <span>
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout */}
            <div className="px-8">

              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full rounded-lg bg-[#10275e] py-3 text-sm font-medium text-white transition hover:bg-[#0c1d47] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkoutLoading
                  ? "Processing Checkout..."
                  : "Checkout"}
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;

