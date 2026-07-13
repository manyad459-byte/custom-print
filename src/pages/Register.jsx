import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://custom-print-backend.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully ✅");
        navigate("/login");
      } else {
        alert(data.message || "Register failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-6"
      style={{
        backgroundImage:
          "url('https://custom-print-backend.onrender.com/image/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* REGISTER CARD */}
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
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-3 text-sm">
            Join PrintifyHub today
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-200 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* BUTTON */}
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
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}

            <span
              onClick={() => navigate("/login")}
              className="
                text-pink-400
                cursor-pointer
                hover:text-pink-300
                font-medium
              "
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}