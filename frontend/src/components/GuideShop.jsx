import React from "react";
import {
  Search,
  ShoppingCart,
  ClipboardCheck,
  CreditCard,
  PackageCheck,
} from "lucide-react";

const GuideShop = () => {
  const steps = [
    {
      title: "BROWSE",
      description: "Explore our collection of quality products.",
      icon: <Search size={28} />,
    },
    {
      title: "ADD TO CART",
      description: "Add your favorite products to your shopping cart.",
      icon: <ShoppingCart size={28} />,
    },
    {
      title: "CHECKOUT",
      description: "Review your selected items before placing your order.",
      icon: <ClipboardCheck size={28} />,
    },
    {
      title: "PAYMENT",
      description: "Choose your preferred payment method securely.",
      icon: <CreditCard size={28} />,
    },
    {
      title: "WAIT",
      description: "Relax while we prepare and deliver your order.",
      icon: <PackageCheck size={28} />,
    },
  ];

  return (
    <section className="bg-gray-400 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-black-700">
            ONE STOP SHOP
          </h2>

          <p className="mt-4 w-full px-6 text-left text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus praesentium exercitationem molestias, recusandae
            perspiciatis laborum eaque dignissimos nemo, dicta harum
            consequuntur reprehenderit. Accusantium tempora nihil doloribus
            fugiat aspernatur doloremque autem.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                {step.icon}
              </div>
  
              <h3 className="text-lg font-bold text-gray-800">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideShop;