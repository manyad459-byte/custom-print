import React from "react";
import {
  FaCog,
  FaUser,
  FaBell,
  FaLock,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const settingsItems = [
    {
      icon: <FaUser />,
      title: "Profile Settings",
      desc: "Manage your personal information",
      action: () => navigate("/profile"),
      color: "text-pink-400",
    },
    {
      icon: <FaBell />,
      title: "Notifications",
      desc: "Check recent updates and alerts",
      action: () => navigate("/notifications"),
      color: "text-purple-400",
    },
    {
      icon: <FaLock />,
      title: "Privacy & Security",
      desc: "Control your account security",
      action: () => navigate("/privacy"),
      color: "text-blue-400",
    },
  ];

  return (
     <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[6px] text-pink-400 text-sm font-semibold">
            Account Preferences
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
            App <span className="text-pink-500">Settings</span>
          </h1>

          <p className="text-gray-400 mt-5 text-lg">
            Customize your PrintifyHub experience
          </p>
        </motion.div>

        {/* SETTINGS CARDS */}
        <div className="space-y-6">
          {settingsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={item.action}
              className="
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
                shadow-2xl
                cursor-pointer
                hover:bg-white/15
                hover:scale-[1.01]
                transition duration-300
              "
            >
              <div className="flex justify-between items-center">

                <div className="flex items-center gap-5">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                  >
                    <span className={item.color}>
                      {item.icon}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.title}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      {item.desc}
                    </p>
                  </div>

                </div>

                <FaChevronRight className="text-gray-400 text-xl" />

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}