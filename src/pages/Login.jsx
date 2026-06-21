import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.user.email);

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

 return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
    style={{
      backgroundImage: "url('http://localhost:5000/image/login-bg.jpg')",
    }}
  >
    
    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/70"></div>

    {/* LOGIN BOX */}
    <div
      className="
        relative
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-2xl
        border border-white/20
        rounded-[30px]
        p-8
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      "
    >

      {/* TOP */}
      <div className="text-center mb-8">

        <h1 className="text-4xl font-extrabold text-white">
          PrintifyHub
        </h1>

        <p className="text-gray-300 mt-3 text-sm">
          Sign in to continue your journey
        </p>

      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-200 mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              bg-white/10
              border border-white/20
              text-white
              placeholder-gray-400
              outline-none
              focus:border-pink-400
              focus:ring-2
              focus:ring-pink-400/30
              transition
            "
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm text-gray-200 mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              bg-white/10
              border border-white/20
              text-white
              placeholder-gray-400
              outline-none
              focus:border-purple-400
              focus:ring-2
              focus:ring-purple-400/30
              transition
            "
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-2xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-pink-500
            via-purple-500
            to-indigo-500
            hover:scale-[1.02]
            transition
            duration-300
            shadow-lg
          "
        >
          Login
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Don’t have an account?{" "}

          <span
            onClick={() => navigate("/register")}
            className="
              text-pink-400
              cursor-pointer
              hover:text-pink-300
              font-medium
            "
          >
            Register
          </span>
        </p>

      </form>
    </div>
  </div>
);
}