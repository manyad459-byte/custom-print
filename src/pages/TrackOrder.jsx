import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBox, FaCheckCircle, FaTruck } from "react-icons/fa";

export default function TrackOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Order not found
      </div>
    );
  }

  const steps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const currentStep = steps.indexOf(order.status);

  const progress =
    currentStep === -1
      ? 0
      : ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] py-24 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <FaTruck className="mx-auto text-5xl text-purple-600 mb-4" />

          <h1 className="text-4xl font-bold text-gray-800">
            Track Your Order
          </h1>

          <p className="text-gray-500 mt-2">
            Order ID: #{order._id.slice(-6)}
          </p>
        </div>

        {/* Status */}
        <div className="bg-gray-100 rounded-2xl p-5 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            Current Status
          </h2>

          <p className="text-purple-600 text-lg mt-2 font-semibold">
            {order.status}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-14">
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="h-4 bg-green-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-right mt-2 text-sm text-gray-500">
            {Math.round(progress)}% Completed
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-5 gap-4">

          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg
                ${
                  index <= currentStep
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                {index <= currentStep ? (
                  <FaCheckCircle />
                ) : (
                  <FaBox />
                )}
              </div>

              <p
                className={`mt-3 text-sm font-medium ${
                  index <= currentStep
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {step}
              </p>
            </div>
          ))}

        </div>

        {/* Products */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">
            Ordered Items
          </h2>

          <div className="space-y-3">
            {order.products.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="font-bold text-purple-600">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            Back to Orders
          </button>
        </div>

      </div>
    </div>
  );
}