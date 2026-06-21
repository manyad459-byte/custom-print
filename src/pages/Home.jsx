import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTshirt,
  FaMugHot,
  FaShoppingBag,
  FaImage,
} from "react-icons/fa";

import {
  MdOutlineLocalShipping,
  MdDesignServices,
} from "react-icons/md";

import { FiShoppingBag } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import heroImage from "../assets/homebgg.png";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative text-white overflow-hidden bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff]">

      {/* HERO SECTION */}
      <div className="relative">

        <div className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 items-center gap-10">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[3px] text-white/80 mb-4 font-semibold">
              Welcome To PrintifyHub
            </p>

            <h1 className="text-6xl font-extrabold leading-tight">
              Creative Printing
              <span className="block text-white/90">
                Solutions
              </span>
            </h1>

            <p className="text-white/70 mt-6 text-lg leading-8 max-w-xl">
              High quality prints, custom designs and premium products made just for you.
            </p>

            <div className="flex gap-5 mt-10 flex-wrap">

              <button
                onClick={() => navigate("/collection")}
                className="px-8 py-4 rounded-2xl bg-white text-[#4b2cff] font-semibold shadow-xl hover:scale-105 transition"
              >
                🛍 Shop Now
              </button>

              <button
                onClick={() => navigate("/customize")}
                className="px-8 py-4 rounded-2xl border border-white/40 hover:bg-white/10 font-semibold transition"
              >
                🎨 Customize Your Plan
              </button>

            </div>

            <div className="flex flex-wrap gap-8 mt-10 text-sm text-white/80">

              <div className="flex items-center gap-2">
                <FiShoppingBag />
                Premium Quality
              </div>

              <div className="flex items-center gap-2">
                <MdDesignServices />
                Custom Designs
              </div>

              <div className="flex items-center gap-2">
                <MdOutlineLocalShipping />
                Fast Delivery
              </div>

            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src={heroImage}
              alt="hero"
              className="w-full max-w-2xl drop-shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto -mt-12 relative z-20">

        <div className="bg-white rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 p-8 gap-6 text-black">

          {[
            { icon: "🛍", num: "100+", label: "Products", color: "purple" },
            { icon: "👥", num: "100+", label: "Happy Customers", color: "pink" },
            { icon: "🏷", num: "10+", label: "Categories", color: "yellow" },
            { icon: "🎧", num: "24/7", label: "Support", color: "blue" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <h2 className="text-3xl font-bold mt-4">{item.num}</h2>
              <p className="text-gray-500">{item.label}</p>
            </div>
          ))}

        </div>
      </div>

      {/* CATEGORIES */}
      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid md:grid-cols-5 gap-6">

          {[
            { icon: <FaTshirt />, title: "T-Shirts", text: "Premium Quality Prints" },
            { icon: <FaMugHot />, title: "Mugs", text: "Custom Printed" },
            { icon: <FaShoppingBag />, title: "Bags", text: "Stylish & Durable" },
            { icon: <FaImage />, title: "Photo Prints", text: "High Resolution" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition text-black">
              <div className="text-5xl text-[#4b2cff] mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.text}</p>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-white flex flex-col justify-between border border-white/20">

            <div>
              <h2 className="text-3xl font-bold">
                Design Your Imagination
              </h2>
              <p className="mt-3 text-white/70">
                We print what you imagine
              </p>
            </div>

            <button
              onClick={() => navigate("/customize")}
              className="mt-8 bg-white text-[#4b2cff] font-bold py-3 rounded-xl hover:scale-105 transition"
            >
              Get Started →
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;