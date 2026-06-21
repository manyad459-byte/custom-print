import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(15px)",
          borderRadius: "25px",
          padding: "40px 30px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >

        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #00e676, #00c853)",
            color: "#fff",
            fontSize: "50px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 20px rgba(0,230,118,0.4)",
          }}
        >
          ✓
        </div>

        <h1 style={{ color: "#fff", fontSize: "30px", marginBottom: "10px" }}>
          Payment Successful
        </h1>

        <p style={{ color: "#ddd", marginBottom: "25px" }}>
          Your order has been placed successfully.
        </p>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "18px",
            borderRadius: "15px",
            color: "#f1f1f1",
            marginBottom: "28px",
            lineHeight: "2",
          }}
        >
          <p>📦 Your items will be delivered soon</p>
          <p>💳 Payment confirmed</p>
          <p>✨ Thank you for choosing PrintifyHub</p>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(45deg, #00c6ff, #0072ff)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(45deg, #ff9800, #ff5722)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            My Orders
          </button>
        </div>

      </div>
    </div>
  );
}