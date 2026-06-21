import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

export default function MyDesigns() {
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [designs, setDesigns] = useState([]);

  const PRODUCT_PRICES = {
    tshirt: 499,
    mug: 299,
    keychain: 199,
    jersy: 259,
    pot: 399,
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myDesigns")) || [];
    setDesigns(saved);

    const sync = () => {
      const updated =
        JSON.parse(localStorage.getItem("myDesigns")) || [];
      setDesigns(updated);
    };

    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const deleteDesign = (id) => {
    const updated = designs.filter((d) => d._id !== id);
    setDesigns(updated);
    localStorage.setItem("myDesigns", JSON.stringify(updated));
  };

  const handleAddToCart = (design) => {
    addToCartContext({
      _id: design._id,
      product: design.product,
      price: design.price || 499,
      preview: design.preview,
      quantity: design.quantity || 1,
    });
  };

  const buyNow = (design) => {
    const item = {
      _id: Date.now().toString(),
      preview: design.preview,
      product: design.product,
      price:
        PRODUCT_PRICES[design.product?.toLowerCase()] || 499,
      quantity: 1,
    };

    addToCartContext(item);
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold">
          My <span className="text-white/80">Designs</span>
        </h2>
        <p className="text-white/70 mt-3">
          Your saved custom creations
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {designs.length === 0 ? (
          <div className="col-span-full text-center text-white/70 text-lg">
            No designs yet 😢
          </div>
        ) : (
          designs.map((design) => (
            <motion.div
              key={design._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            >

              {/* IMAGE */}
              <img
                src={design.preview}
                alt="design"
                className="w-full h-56 object-cover"
              />

              {/* BUTTONS */}
              <div className="p-4 space-y-3">

                <div className="flex gap-3">

                  <button
                    onClick={() => handleAddToCart(design)}
                    className="flex-1 py-2 rounded-xl bg-white text-[#4b2cff] font-semibold hover:scale-105 transition"
                  >
                    🛒 Add
                  </button>

                  <button
                    onClick={() => buyNow(design)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-105 transition"
                  >
                    ⚡ Buy
                  </button>

                </div>

                <button
                  onClick={() => deleteDesign(design._id)}
                  className="w-full py-2 rounded-xl bg-red-500/80 hover:bg-red-600 transition"
                >
                  🗑 Delete
                </button>

              </div>

            </motion.div>
          ))
        )}

      </div>
    </div>
  );
}