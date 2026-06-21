import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/homebgg.png";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 pt-28 pb-16">

      {/* HEADING */}
      <div className="text-center mb-16">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[6px] text-white/70 text-sm font-semibold"
        >
          About PrintifyHub
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mt-2 leading-tight"
        >
          Creative Printing{" "}
          <span className="text-white/90">Solutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/70 mt-6 max-w-3xl mx-auto text-lg"
        >
          We bring your ideas to life with premium quality custom printing,
          modern designs, and fast delivery services.
        </motion.p>

      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/20 blur-3xl opacity-20 rounded-full"></div>

          <img
            src={aboutImg}
            alt="PrintifyHub"
            className="
              relative
              rounded-3xl
              shadow-2xl
              border border-white/20
              hover:scale-105
              transition duration-500
            "
          />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            rounded-3xl
            p-8
            shadow-2xl
          "
        >

          <h2 className="text-3xl font-bold mb-5 text-white">
            Who We Are
          </h2>

          <p className="text-white/70 leading-8 mb-8">
            PrintifyHub is your destination for personalized printing products.
            From custom t-shirts and mugs to unique gifts and branding
            materials, we combine creativity with premium quality printing.
          </p>

          <h2 className="text-3xl font-bold mb-5 text-white">
            Our Mission
          </h2>

          <p className="text-white/70 leading-8 mb-8">
            Our mission is to empower creativity through modern printing
            technology, affordable pricing, and beautiful custom products.
          </p>

          <h2 className="text-3xl font-bold mb-5 text-white">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-6 text-white/80">

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              ✨ Premium Quality
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              🚚 Fast Delivery
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              🎨 Creative Designs
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              💰 Affordable Pricing
            </div>

          </div>

        </motion.div>

      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-8">

        {[
          { num: "500+", label: "Happy Customers" },
          { num: "1000+", label: "Products Printed" },
          { num: "24/7", label: "Customer Support" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              rounded-3xl
              p-10
              text-center
              shadow-xl
            "
          >
            <h2 className="text-5xl font-extrabold text-white">
              {item.num}
            </h2>

            <p className="mt-4 text-white/70 text-lg">
              {item.label}
            </p>
          </motion.div>
        ))}

      </div>

    </div>
  );
}