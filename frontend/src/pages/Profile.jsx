import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/base";

const ProductImage = ({ image }) => {
  if (!image) {
    return (
      <div className="flex h-[40px] w-[60px] items-center justify-center overflow-hidden rounded border border-gray-300 bg-gray-100">
        <span className="text-[8px] text-gray-400">
          No Image
        </span>
      </div>
    );
  }

  const imageUrl = image.startsWith("http")
    ? image
    : `${BASE_URL}${image.startsWith("/") ? image : `/images/${image}`}`;

  return (
    <img
      src={imageUrl}
      alt="Product"
      className="h-[40px] w-[60px] rounded border border-gray-300 object-contain"
    />
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PROFILE:", response.data);

        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error.response?.data || error.message
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    const getPurchaseHistory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/purchase-history/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "PURCHASE HISTORY:",
          response.data
        );

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
        setPurchaseLoading(false);
      }
    };

    getProfile();
    getPurchaseHistory();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfdfd]">
        <p className="text-gray-600">
          Loading profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfdfd]">
        <p className="text-red-600">
          Unable to load profile.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfdfd] px-4 py-7 font-sans text-black">
      <div className="mx-auto w-full max-w-[900px]">

        {/* Profile Card */}
        <section className="border border-gray-200 bg-white px-5 py-5 shadow-[0_2px_2px_rgba(0,0,0,0.25)]">

          <h1 className="text-[24px] font-bold leading-tight">
            My Profile
          </h1>

          <div className="mt-4 space-y-2 text-sm">

            <div className="flex items-center">
              <span className="w-[80px] font-semibold">
                Username:
              </span>

              <span>
                {user.username}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-[80px] font-semibold">
                Email:
              </span>

              <span>
                {user.email}
              </span>
            </div>

          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-[6px] bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>

        </section>

        {/* Purchase History */}
        <section className="mt-6 border border-gray-100 bg-white px-5 py-5 shadow-[0_2px_2px_rgba(0,0,0,0.2)]">

          <h2 className="text-[24px] font-bold leading-tight">
            Purchase History
          </h2>

          {purchaseLoading ? (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-500">
                Loading purchases...
              </p>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-red-600">
                {error}
              </p>
            </div>
          ) : purchases.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-500">
                You have no purchases yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">

              {purchases.map((purchase) => (

                <div
                  key={purchase.id}
                  className="border border-gray-200 bg-white p-4"
                >

                  {/* Order Header */}
                  <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">

                    <div>
                      <h3 className="text-sm font-bold">
                        Order #{purchase.id}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                          purchase.created_at
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="text-sm font-bold">
                        ₱
                        {Number(
                          purchase.total_price
                        ).toFixed(2)}
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-[10px] font-semibold ${
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

                  {/* Products */}
                  <div className="space-y-3">

                    {purchase.items?.map((item) => (

                      <div
                        key={item.id}
                        className="grid grid-cols-[80px_1fr_100px_100px] items-center gap-4 border-b border-gray-100 pb-3 text-xs"
                      >

                        {/* Product Image */}
                        <ProductImage
                          image={item.product_image}
                        />

                        {/* Product Name */}
                        <div>
                          <p className="font-semibold">
                            {item.product_name}
                          </p>

                          <p className="mt-1 text-gray-500">
                            Price: ₱
                            {Number(
                              item.product_price
                            ).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="text-center">
                          <p className="text-gray-500">
                            Quantity
                          </p>

                          <p className="mt-1 font-semibold">
                            {item.quantity}
                          </p>
                        </div>

                        {/* Amount */}
                        <div className="text-right">
                          <p className="text-gray-500">
                            Amount
                          </p>

                          <p className="mt-1 font-semibold">
                            ₱
                            {Number(
                              item.total_price
                            ).toFixed(2)}
                          </p>
                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
};

export default Profile;