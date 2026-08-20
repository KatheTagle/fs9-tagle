import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/base";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPurchaseHistory = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please log in to view your purchase history.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/api/purchase-history/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PURCHASE HISTORY:", response.data);

      // Only use data returned by Django
      setPurchases(response.data);

    } catch (error) {
      console.error(
        "Failed to load purchase history:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.error ||
        "Unable to load purchase history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center">
        <h1 className="text-xl font-semibold">
          Loading purchase history...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 text-center">
        <p className="font-semibold text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="mx-auto w-full max-w-4xl px-4">

        <h1 className="mb-8 text-3xl font-bold text-black">
          Purchase History
        </h1>

        {purchases.length === 0 ? (
          <div className="border border-gray-200 bg-white p-10 text-center shadow-md">
            <p className="text-gray-500">
              You have no purchases yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="border border-gray-200 bg-white p-6 shadow-md"
              >

                {/* Order Header */}
                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">

                  <div>
                    <h2 className="text-lg font-bold">
                      Order #{purchase.id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(
                        purchase.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-lg font-bold">
                      ₱{Number(purchase.total_price).toFixed(2)}
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        purchase.is_paid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {purchase.is_paid
                        ? "PAID"
                        : purchase.status || "PENDING"}
                    </span>

                  </div>
                </div>

                {/* Purchased Products */}
                <div className="space-y-4">

                  {purchase.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-gray-100 pb-4"
                    >

                      <div>
                        <h3 className="font-semibold text-black">
                          {item.product_name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Price: ₱
                          {Number(item.product_price).toFixed(2)}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="font-semibold">
                        ₱
                        {(
                          Number(item.product_price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default PurchaseHistory;