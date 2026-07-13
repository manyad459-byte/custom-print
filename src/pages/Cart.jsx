import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">

      {/* HEADER */}
      <div className="text-center mb-14">
        <p className="uppercase tracking-[6px] text-white/70 text-sm font-semibold">
          Shopping Cart
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
          Your <span className="text-white/90">Cart</span>
        </h1>

        <p className="text-white/70 mt-5 text-lg">
          Review your selected products before checkout.
        </p>
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-14 text-center shadow-2xl">

          <div className="text-7xl mb-6">🛒</div>

          <h2 className="text-3xl font-bold mb-4">
            Your Cart is Empty
          </h2>

          <p className="text-white/70 mb-8">
            Add products to continue shopping.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="px-8 py-4 rounded-full bg-white text-[#4b2cff] font-bold hover:scale-105 transition"
          >
            Browse Products
          </button>

        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-6">

          {/* ITEMS */}
          {cart.map((item) => (
            <div
              key={item._id || item.id || item.product}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:scale-[1.01] transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-5 w-full">

                <img
  src={
    item.preview
      ? item.preview
      : item.image
      ? `https://custom-print-backend.onrender.com${item.image}`
      : "/default-product.png"
  }
  alt={item.product || item.name}
  className="w-32 h-32 object-cover rounded-2xl border border-white/20"
/>

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.product || item.name}
                  </h2>

                  <p className="text-white/80 text-xl mt-2 font-semibold">
                    ₹{item.price}
                  </p>

                  <p className="text-white/60 mt-2">
                    Subtotal: ₹{item.price * (item.quantity || 1)}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-center gap-4">

                {/* QTY */}
                <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-full border border-white/20">

                  <button
                    onClick={() =>
                      updateQty(
                        item._id,
                        Math.max(1, (item.quantity || 1) - 1)
                      )
                    }
                    className="w-8 h-8 rounded-full bg-white text-[#4b2cff] flex items-center justify-center hover:scale-110 transition"
                  >
                    <FaMinus size={12} />
                  </button>

                  <span className="text-lg font-bold">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      updateQty(item._id, (item.quantity || 1) + 1)
                    }
                    className="w-8 h-8 rounded-full bg-white text-[#4b2cff] flex items-center justify-center hover:scale-110 transition"
                  >
                    <FaPlus size={12} />
                  </button>

                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-300 hover:text-red-400 transition flex items-center gap-2"
                >
                  <FaTrash />
                  Remove
                </button>

              </div>

            </div>
          ))}

          {/* TOTAL */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Cart Total
              </h2>

              <span className="text-4xl font-extrabold text-white">
                ₹{total}
              </span>

            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 rounded-2xl bg-white text-[#4b2cff] font-bold hover:scale-[1.02] transition shadow-lg flex items-center justify-center gap-3"
            >
              <FaShoppingCart />
              Confirm Your Order
            </button>

          </div>

        </div>
      )}
    </div>
  );
}