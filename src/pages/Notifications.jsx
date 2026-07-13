import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BellRing } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const clearNotifications = async () => {
    try {
      await axios.delete("https://custom-print-backend.onrender.com/notifications");
      setNotifications([]);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get("https://custom-print-backend.onrender.com/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log(err));
  }, []);
return (
   <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">


    <div className="max-w-4xl mx-auto">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="uppercase tracking-[6px] text-blue-400 text-sm font-semibold">
          Updates & Alerts
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
          My <span className="text-purple-400">Notifications</span>
        </h1>

        <p className="text-gray-300 mt-5 text-lg">
          Stay updated with your latest orders and activity
        </p>
      </motion.div>

      {/* CLEAR BUTTON */}
      {notifications.length > 0 && (
        <div className="flex justify-center mb-10">
         <button
  onClick={clearNotifications}
  className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
>
  Clear Notifications
</button>
        </div>
      )}

      {/* EMPTY */}
      {notifications.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-14 text-center">
          <BellRing className="mx-auto text-blue-400 w-16 h-16 mb-5" />
          <h2 className="text-3xl font-bold mb-3">No Notifications Yet</h2>
          <p className="text-gray-300">
            You’ll receive order updates and alerts here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {notifications.map((item, index) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <BellRing className="text-blue-400" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-blue-400">
                      {item.title || "Order Notification"}
                    </h2>

                    <p className="text-gray-300 mt-2">
                      {item.message}
                    </p>
                  </div>

                </div>

                <div className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);}