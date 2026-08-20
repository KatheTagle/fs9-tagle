import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get product from Django
  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/products/${id}/`
        );

        setProduct(response.data);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // Add product to Django cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    setAdding(true);
    setMessage("");
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/api/cart/add/`,
        {
          product: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Product added to cart successfully!");

      setTimeout(() => {
        navigate("/cart");
      }, 800);

    } catch (err) {
      console.error(
        "Add to cart failed:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Unable to add product to cart."
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Loading product...
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="py-20 text-center text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center text-3xl font-bold">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">

        {/* Product Image */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.product_name}
            className="mx-auto h-[450px] object-contain"
          />
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-5xl font-bold">
            {product.product_name}
          </h1>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          <h2 className="mt-8 text-4xl font-bold text-blue-700">
            ${product.product_price}
          </h2>

          <p className="mt-4 text-lg font-semibold text-green-600">
            In Stock: {product.countInStock}
          </p>

          {/* Quantity */}
          <div className="mt-6">
            <p className="mb-2 text-lg font-semibold">
              Quantity
            </p>

            <div className="flex items-center gap-4">

              {/* Minus */}
              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-xl font-bold hover:bg-gray-300"
              >
                −
              </button>

              {/* Quantity */}
              <span className="w-10 text-center text-xl font-semibold">
                {quantity}
              </span>

              {/* Plus */}
              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(product.countInStock, prev + 1)
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-xl font-bold hover:bg-gray-300"
              >
                +
              </button>

            </div>
          </div>

          {/* Success Message */}
          {message && (
            <p className="mt-5 text-sm font-semibold text-green-600">
              {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="mt-5 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding || product.countInStock === 0}
            className="mt-6 w-full rounded-xl bg-blue-700 px-10 py-4 text-center font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;