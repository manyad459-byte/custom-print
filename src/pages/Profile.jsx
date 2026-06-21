import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // 🌍 Global user (for navbar)
  const { user, setUser } = useContext(UserContext);

  // 🧾 Local form state (for editing)
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/users/get/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("PROFILE DATA:", data);

        const userData = data.user || data;

        const cleanUser = {
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          image: userData.image || ""
        };

        setUser(cleanUser);       // 🌍 global
        setLocalUser(cleanUser);  // 🧾 form

        if (cleanUser.image) {
          setPreview(`http://localhost:5000${cleanUser.image}`);
        }

      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchProfile();
  }, [setUser]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setLocalUser({
      ...localUser,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= SAVE =================
  const handleSave = async () => {
    console.log("SAVE CLICKED");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", localUser.name);
      formData.append("phone", localUser.phone);
      formData.append("address", localUser.address);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("http://localhost:5000/api/users/update/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("SAVE FAILED:", res.status, errorText);
        alert("Save failed: " + res.status);
        return;
      }

      const data = await res.json();
      alert("Profile Saved Successfully ✅");

      console.log("UPDATED:", data);

      const updatedUser = data.user || data;

      const cleanUser = {
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
        image: updatedUser.image || ""
      };

      setUser(cleanUser);       // 🌍 update navbar
      setLocalUser(cleanUser);  // 🧾 update form

      if (cleanUser.image) {
        setPreview(`http://localhost:5000${cleanUser.image}`);
      }

      setImageFile(null);
      setIsEditing(false);

    } catch (err) {
      console.error(err);
      alert("Network error while saving profile");
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ================= COMPLETION =================
  const completion =
    (localUser.name ? 25 : 0) +
    (localUser.email ? 25 : 0) +
    (localUser.phone ? 25 : 0) +
    (localUser.address ? 25 : 0);

  return (
    <div className="profile-page">
      <div className="profile-wrapper">

        {/* SIDEBAR */}
        <div className="profile-sidebar">
          <div className="profile-user">

            <div className="profile-image-container">
              <img
                src={preview || "/default-user.png"}
                alt="profile"
              />

              {isEditing && (
                <label className="image-upload">
                  <FaCamera />
                  <input type="file" onChange={handleImageChange} hidden />
                </label>
              )}
            </div>

            <h3>{localUser.name || "User"}</h3>
          </div>

          <ul className="profile-menu">
            <li><button onClick={() => navigate("/orders")}>My Orders</button></li>
            <li><button onClick={() => navigate("/wishlist")}>Wishlist</button></li>
            <li><button onClick={() => navigate("/address")}>Addresses</button></li>
            <li><button className="logout" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="profile-content">

          <h2>Personal Information</h2>

          {/* COMPLETION */}
          <div className="completion-box">
            <p>Profile Completion: {completion}%</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </div>

          {/* FORM */}
          <div className="profile-form">

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={localUser.name}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={localUser.email}
                readOnly
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={localUser.phone}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={localUser.address}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

          </div>

          <div style={{ marginTop: "25px" }}>
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;