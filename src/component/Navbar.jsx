import React, { useState, useContext, useEffect } from "react";
import {
  FaShoppingCart,
  FaBars,
  FaHome,
  FaHeart,
  FaCog,
} from "react-icons/fa";

import { Bell } from "lucide-react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css";

import logo from "../assets/logo.jpg";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { UserContext } from "../context/UserContext";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  // CONTEXTS
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user } = useContext(UserContext);

  // CART COUNT
  const cartCount = cart.reduce(
    (total, item) => total + (item.qty || 1),
    0
  );

  // WISHLIST COUNT
  const wishlistCount = wishlist.length;

  // NOTIFICATION COUNT
  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    setProfileOpen(false);

    navigate("/login");
  };

  // FETCH NOTIFICATIONS
  useEffect(() => {

    const fetchNotifications = () => {
      fetch("https://custom-print-backend.onrender.com/notifications")
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.log(err));
    };

    fetchNotifications();

    const interval = setInterval(
      fetchNotifications,
      3000
    );

    return () => clearInterval(interval);

  }, []);

  return (

    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">

        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="nav-logo"
          />
        </Link>

      </div>

      {/* MENU */}
      <ul className={menuOpen ? "menu active" : "menu"}>

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            <FaHome />
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            📦 Collection
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            ℹ️ About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            📞 Contact
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            🧾 Orders
          </NavLink>
        </li>

      </ul>

      {/* RIGHT */}
      <div className="nav-right">

        {/* NOTIFICATIONS */}
        <div
          onClick={() => navigate("/notifications")}
          className="notification-icon"
        >

          <Bell size={22} />

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount}
            </span>
          )}

        </div>

        {/* SETTINGS */}
        <Link to="/settings">
          <FaCog />
        </Link>

        {/* LOGIN */}
        {!localStorage.getItem("token") && (

          <Link to="/login">

            <button className="btn-primary">
              Login
            </button>

          </Link>

        )}

        {/* PROFILE */}
        <div className="profile-container">

          <div
            className="profile-icon"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >

            <img
              src={
                user?.image?`https://custom-print-backend.onrender.com${user.image}`
                  : "/default-user.png"
              }
              alt="profile"
              className="nav-profile"
              onError={(e) =>
                (e.target.src =
                  "/default-user.png")
              }
            />

          </div>

          {profileOpen && (

            <div className="profile-dropdown">

              <p
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
              >
                My Profile
              </p>

              <p
                onClick={() => {
                  navigate("/orders");
                  setProfileOpen(false);
                }}
              >
                My Orders
              </p>

              <p onClick={handleLogout}>
                Logout
              </p>

            </div>

          )}

        </div>

        {/* WISHLIST */}
        <Link
          to="/wishlist"
          className="wishlist-icon"
        >

          <FaHeart />

          {wishlistCount > 0 && (
            <span className="notification-badge">
              {wishlistCount}
            </span>
          )}

        </Link>

        {/* CART */}
        <Link
          to="/cart"
          className="cart"
        >

          <FaShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </Link>

        {/* MOBILE */}
        <FaBars
          className="hamburger"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        />

      </div>

    </nav>
  );
}

export default Navbar;