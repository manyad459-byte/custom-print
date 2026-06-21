import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">

      {/* HEADER */}
      <div className="text-center mb-14">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[6px] text-white/70 text-sm font-semibold"
        >
          Contact PrintifyHub
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mt-3"
        >
          Let’s Build Something{" "}
          <span className="text-white/90">Creative</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/70 mt-5 max-w-2xl mx-auto text-lg"
        >
          We would love to hear from you. Reach out for custom printing,
          creative designs, and premium products.
        </motion.p>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >

          <h2 className="text-3xl font-bold text-white mb-6">
            Get In Touch
          </h2>

          <p className="text-white/70 leading-7 mb-8">
            Our team is always ready to help you with custom printing solutions and premium products.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <FaEnvelope className="text-pink-300 text-xl" />
              <div>
                <p className="text-white/50 text-sm">Email</p>
                <h3 className="font-semibold">support@printifyhub.com</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <FaPhone className="text-purple-300 text-xl" />
              <div>
                <p className="text-white/50 text-sm">Phone</p>
                <h3 className="font-semibold">+91 9876543210</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <FaMapMarkerAlt className="text-blue-300 text-xl" />
              <div>
                <p className="text-white/50 text-sm">Address</p>
                <h3 className="font-semibold">
                  Sagar, Shivamogga, Karnataka
                </h3>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >

          <h2 className="text-3xl font-bold mb-6">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-white/40"
            />

            <input
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-white/40"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-white/40"
            />

            <button
              className="w-full py-4 rounded-2xl font-bold bg-white text-[#4b2cff] hover:scale-105 transition"
            >
              Send Message 🚀
            </button>

          </form>

        </motion.div>

      </div>

      {/* MAP */}
      <div className="max-w-7xl mx-auto mt-14">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Sagar,karnataka&output=embed"
          className="w-full h-[350px] rounded-3xl border border-white/20 shadow-2xl"
        />
      </div>

    </div>
  );
}