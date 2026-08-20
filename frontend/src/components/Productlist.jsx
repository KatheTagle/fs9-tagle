import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";

const ProductList = ({ showAll = false }) => {
  const [products, setProducts] = useState([]);

  const PrductData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/`
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    PrductData();
  }, []);

  // Show only 6 products unless showAll is true
  const displayedProducts = showAll
    ? products
    : products.slice(0, 6);

  return (
    <section className="bg-gray-100 px-6 py-16">
      {/* Section Title */}
      <div className="mx-auto mb-10 max-w-7xl">
        <h2 className="text-3xl font-bold text-[#10265A]">
          AVAILABLE CISCO PRODUCTS
        </h2>

        <p className="mt-3 text-gray-600">
          Browse our latest devices Cisco products designed for style,
          comfort, and performance.
        </p>
      </div>

      {/* Products */}
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
          >
            <div className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

              {/* Product Image */}
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.product_name}
                className="h-64 w-full object-contain p-4"
              />

              {/* Product Information */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  {product.product_name}
                </h3>

                <p className="mt-2 text-2xl font-bold text-indigo-600">
                  ${product.product_price}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Items Left: {product.countInStock}
                </p>

                <button
                  className="mt-5 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  VIEW PRODUCT DETAILS
                </button>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Show button ONLY when displaying the first 6 */}
      {!showAll && (
        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
          >
            CLICK HERE FOR OTHER PRODUCTS
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductList;