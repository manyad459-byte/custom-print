import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchOrders = async () => {
      try {console.log("USER DATA:", user);
      
        const res = await axios.get(
          `http://localhost:5000/orders/${user?.email || "guest"}`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
<div className="min-h-screen bg-gray-200 text-black px-6 py-28">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <p className="uppercase tracking-[6px] text-pink-400 text-sm font-semibold">
          Your Purchase History
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
          My <span className="text-pink-500">Orders</span>
        </h1>

        <p className="text-gray-400 mt-5 text-lg">
          Track all your recent purchases and order details
        </p>
      </motion.div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-14 text-center shadow-2xl"
        >
          <FaBoxOpen className="text-6xl mx-auto text-pink-400 mb-6" />

          <h2 className="text-3xl font-bold mb-3">
            No Orders Found
          </h2>

          <p className="text-gray-300">
            Looks like you haven’t placed any orders yet.
          </p>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
className="bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] rounded-3xl p-5 shadow-xl text-white h-fit"  >

              {/* TOP */}
              

   <div className="flex justify-between items-start mb-4">          
     <div>     
     <h2 className="text-lg font-bold text-pink-400">
                    Order #{index + 1}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    Payment: {order.paymentMethod}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap">

                  {/* TOTAL BOX */}
                  <div className="bg-white/20 px-5 py-3 rounded-2xl border border-white/20">
                    <p className="text-gray-400 text-sm">Total</p>
                    <h3 className="text-xl font-bold text-white">
                      ₹{order.totalAmount}
                    </h3>
                  </div>

                  {/* STATUS BOX */}
{/* STATUS BOX */}
<div
  className="flex items-center cursor-pointer"
  onClick={() =>
    navigate("/track-order", {
      state: { order },
    })
  }
>
  <span
    className={`px-4 py-2 rounded-full text-sm font-semibold
      ${
        order.status === "Pending"
          ? "bg-yellow-500/20 text-yellow-300"
          : order.status === "Confirmed"
          ? "bg-blue-500/20 text-blue-300"
          : order.status === "Processing"
          ? "bg-purple-500/20 text-purple-300"
          : order.status === "Shipped"
          ? "bg-orange-500/20 text-orange-300"
          : "bg-green-500/20 text-green-300"
      }`}
  >
    {order.status === "Delivered"
      ? "✅ Delivered"
      : `📦 ${order.status || "Pending"}`}
  </span>
</div>
                </div>
              </div>

              {/* ITEMS */}
              <div>
                <h3 className="text-xl font-semibold mb-5 text-blue-300">
                  Ordered Items
                </h3>

                <div className="grid gap-4">

                {order.products.slice(0, 2).map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-white/10 border border-white/20 rounded-2xl p-4"
                    >
                      <div>
                        <p className="font-semibold text-lg">
                          {item.name}
                        </p>

                        <p className="text-gray-400 text-sm">
                          Quantity: {item.qty}
                        </p>
                      </div>

                      <div className="text-pink-400 font-bold text-lg">
                        ₹{item.price}
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </motion.div>
          ))}

        </div>
      )}
    </div>
  );
}