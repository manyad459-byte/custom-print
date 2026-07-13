import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  navigate("/login");
};

  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white text-2xl">
        Access Denied ❌
      </div>
    );
  }

  const fetchProducts = async () => {
    const res = await axios.get("https://custom-print-backend.onrender.com/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("https://custom-print-backend.onrender.com/orders");
    setOrders(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("https://custom-print-backend.onrender.com/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("image", image);

    if (editingId) {
      await axios.put(`https://custom-print-backend.onrender.com/product/${editingId}`, formData);
    } else {
      await axios.post("https://custom-print-backend.onrender.com/add-product", formData);
    }

    setName("");
    setPrice("");
    setCategory("");
    setImage(null);
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://custom-print-backend.onrender.com/product/${id}`);
    fetchProducts();
  };

  const editProduct = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white">

      {/* SIDEBAR */}
<div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-center">
          🛒 Admin
        </h2>
      

        {["dashboard", "products", "orders", "payments","users"].map((tab) => (
          <p
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-3 rounded-xl mb-3 transition ${
              activeTab === tab
                ? "bg-white text-[#4b2cff] font-bold"
                : "hover:bg-white/10"
            }`}
          >
            {tab === "dashboard" && "📊 Dashboard"}
            {tab === "products" && "📦 Products"}
            {tab === "orders" && "🧾 Orders"}
            {tab === "payments" && "💰 Payments"}
            {tab === "users" && "👤 Users"}
          </p>
        ))}

      </div>

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6 uppercase">
          {activeTab}
        </h2>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl text-center border border-white/20">
              <h3 className="text-xl">Products</h3>
              <p className="text-3xl font-bold mt-2">{products.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl text-center border border-white/20">
              <h3 className="text-xl">Orders</h3>
              <p className="text-3xl font-bold mt-2">{orders.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl text-center border border-white/20">
              <h3 className="text-xl">Users</h3>
              <p className="text-3xl font-bold mt-2">{users.length}</p>
            </div>

          </div>
        )}
{/* Push Logout to Bottom */}
<div className="mt-auto pt-8">
  <button
    onClick={handleLogout}
    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-bold"
  >
    🚪 Logout
  </button>
</div>

</div>
        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-8">

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 max-w-xl space-y-3"
            >
              <input
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
              />

              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
              />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-[#4b2cff] font-bold"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </form>

            {/* PRODUCTS GRID */}
            <div className="grid md:grid-cols-4 gap-6">

              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20"
                >

                  <img
                    src={`https://custom-print-backend.onrender.com${item.image}`}
                    className="w-full h-40 object-cover rounded-xl"
                  />

                  <h4 className="mt-3 font-bold">{item.name}</h4>
                  <p className="text-white/70">₹{item.price}</p>

                  <div className="flex justify-between mt-3">

                    <button onClick={() => editProduct(item)}>
                      <FaEdit />
                    </button>

                    <button onClick={() => handleDelete(item._id)}>
                      <FaTrash className="text-red-400" />
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* ORDERS */}
{activeTab === "orders" && (
  <div className="space-y-4">

    {orders.map((order, i) => (
      <div
        key={i}
        className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20"
      >
        <p><b>User:</b> {order.userId}</p>
        <p><b>Total:</b> ₹{order.totalAmount}</p>
        <p><b>Payment:</b> {order.paymentMethod}</p>

        <div className="mt-3">
          <label className="mr-2 font-bold">
            Status:
          </label>

          <select
            value={order.status || "Pending"}
            onChange={async (e) => {
              try {
                await axios.put(
                  `https://custom-print-backend.onrender.com/orders/${order._id}/status`,
                  {
                    status: e.target.value,
                  }
                );

                fetchOrders();
              } catch (err) {
                console.log(err);
              }
            }}
            className="bg-white text-black px-3 py-1 rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

      </div>
    ))}

  </div>
)}

        {/* USERS */}
        {activeTab === "users" && (
          <div className="space-y-4">

            {users.map((u, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20"
              >
                <p><b>{u.name}</b></p>
                <p className="text-white/70">{u.email}</p>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;