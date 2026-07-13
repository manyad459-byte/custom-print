import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

const [customerName, setCustomerName] = useState(user?.name || "");
const [phoneNumber, setPhoneNumber] = useState("");

const userId = user?.email || user?.user?.email;  
  const navigate = useNavigate();

  const { removeFromCart, updateQty } = useContext(CartContext);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
const formatted = savedCart.map((item) => ({
  _id: item._id,
  name: item.name,
  price: item.price || 499,
  qty: item.quantity || 1,
  preview: item.preview,
  image: item.image,
}));
    setOrder(formatted);
  }, []);

  const total = order.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
const handlePlaceOrder = async () => {
  if (!customerName.trim())
  return alert("Please enter your name ❌");

if (!phoneNumber.trim())
  return alert("Please enter phone number ❌");

if (!address.trim())
  return alert("Please enter delivery address ❌");

if (!order.length)
  return alert("Cart is empty ❌");

if (!userId)
  return alert("User not logged in ❌");

  if (paymentMethod === "COD") {
    await axios.post("https://custom-print-backend.onrender.com/order", {
  userId,
  customerName,
  phoneNumber,
  products: order,
  totalAmount: total,
  address,
  paymentMethod: "COD",
});

    localStorage.removeItem("cart");
    alert("Order Placed Successfully 🎉");
    navigate("/success");
    return;
  }
if (paymentMethod === "ONLINE") {
  const isLoaded = await loadRazorpay();

  if (!isLoaded) {
    alert("Razorpay failed to load");
    return;
  }

  const orderData = await axios.post(
    "https://custom-print-backend.onrender.com/create-order",
    {
      amount: total,
    }
  );

  const options = {
    key: "rzp_test_SjLybjIOFMZaMs",
    amount: orderData.data.amount,
    currency: "INR",
    name: "Custom Print Store",
    description: "Order Payment",
    order_id: orderData.data.id,

    prefill: {
      name: customerName,
      email: userId,
      contact: phoneNumber,
    },

    theme: {
      color: "#3399cc",
    },

    handler: async function (response) {
      await axios.post("https://custom-print-backend.onrender.com/order", {
        userId,
        customerName,
        phoneNumber,
        products: order,
        totalAmount: total,
        address,
        paymentMethod: "ONLINE",
      });

      localStorage.removeItem("cart");
      navigate("/success");
    },
    modal: {
  ondismiss: async function () {
    const demo = window.confirm(
      "Demo Mode: Mark payment as successful?"
    );

    if (demo) {
      await axios.post("https://custom-print-backend.onrender.com/order", {
        userId,
        customerName,
        phoneNumber,
        products: order,
        totalAmount: total,
        address,
        paymentMethod: "ONLINE",
      });

      localStorage.removeItem("cart");

      alert("Demo Payment Successful 🎉");

      navigate("/success");
    }
  },
},
  };

  const razor = new window.Razorpay(options);
razor.open();
return;
}
  
};
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[6px] text-white/70 text-sm font-semibold">
            Secure Checkout
          </p>

          <h1 className="text-5xl font-extrabold mt-4">
            Complete Your{" "}
            <span className="text-white/90">Order</span>
          </h1>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* ITEMS */}
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {order.length === 0 ? (
            <p className="text-center text-white/70 py-10">
              No items found 😢
            </p>
          ) : (
            <div className="space-y-5">

              {order.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row justify-between items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5"
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4 w-full">
          <img
  src={
    item.preview
      ? item.preview
      : item.image
      ? item.image.startsWith("http")
        ? item.image
        : `//https://custom-print-backend.onrender.com${item.image}`
      : "/default-product.png"
  }
  alt={item.name}
  className="w-24 h-24 object-cover rounded-2xl border border-white/20"
/>
                    <div>
                      <h2 className="font-bold text-lg">{item.name}</h2>
                      <p className="text-white/70">₹{item.price}</p>

                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() => {
                            if (item.qty <= 1) return;

                            updateQty(item._id, item.qty - 1);
                            setOrder((prev) =>
                              prev.map((p) =>
                                p._id === item._id
                                  ? { ...p, qty: p.qty - 1 }
                                  : p
                              )
                            );
                          }}
                          className="w-8 h-8 rounded-full bg-white text-[#4b2cff]"
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() => {
                            updateQty(item._id, item.qty + 1);
                            setOrder((prev) =>
                              prev.map((p) =>
                                p._id === item._id
                                  ? { ...p, qty: p.qty + 1 }
                                  : p
                              )
                            );
                          }}
                          className="w-8 h-8 rounded-full bg-white text-[#4b2cff]"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₹{item.price * item.qty}
                    </p>

                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        setOrder((prev) =>
                          prev.filter((p) => p._id !== item._id)
                        );
                      }}
                      className="text-red-300 mt-3"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* TOTAL */}
          <div className="mt-8 flex justify-between bg-white/10 p-6 rounded-2xl border border-white/20">
            <h2 className="text-xl font-bold">Total</h2>
            <h2 className="text-3xl font-extrabold">₹{total}</h2>
          </div>
{/* CUSTOMER DETAILS */}
<div className="mt-8">
  <h2 className="text-xl font-bold mb-3">Customer Details</h2>

  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <label className="block mb-2 text-white/80">
        Full Name
      </label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Enter your full name"
        className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none"
      />
    </div>

    <div>
      <label className="block mb-2 text-white/80">
        Phone Number
      </label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none"
      />
    </div>

  </div>
</div>
          {/* ADDRESS */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Delivery Address</h2>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none"
              rows="4"
              placeholder="Enter your address..."
            />
          </div>

          {/* PAYMENT */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Payment</h2>

            <div className="flex gap-4">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                COD
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online
              </label>

            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-10 py-4 bg-white text-[#4b2cff] font-bold rounded-2xl hover:scale-105 transition"
          >
            Place Order 🚀
          </button>

        </div>

      </div>

    </div>
  );
}