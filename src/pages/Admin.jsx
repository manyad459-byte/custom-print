import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const totalRevenue = orders.reduce(
  (sum, order) => sum + (order.totalAmount || 0),
  0
);

const deliveredRevenue = orders
  .filter((order) => order.status === "Delivered")
  .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

const pendingRevenue = orders
  .filter((order) => order.status !== "Delivered")
  .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

const paidOrders = orders.filter(
  (order) =>
    order.paymentMethod &&
    order.paymentMethod.toUpperCase() === "ONLINE"
).length;

const codOrders = orders.filter(
  (order) =>
    order.paymentMethod &&
    order.paymentMethod.toUpperCase() === "COD"
).length;
const chartData = [
  {
    name: "Revenue",
    amount: totalRevenue,
  },
  {
    name: "Delivered",
    amount: deliveredRevenue,
  },
  {
    name: "Pending",
    amount: pendingRevenue,
  },
];
const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const pendingOrders = orders.filter(
  (order) => order.status !== "Delivered"
).length;

const totalProducts = products.length;

const totalCustomers = users.filter(
  (u) => u.role !== "admin"
).length;

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
    await fetchProducts();

if (editingId) {
  toast.success("✅ Product updated successfully!");
} else {
  toast.success("✅ Product added successfully!");
}
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(
      `https://custom-print-backend.onrender.com/product/${id}`
    );

    await fetchProducts();

    toast.success("🗑️ Product deleted successfully!");
  } catch (err) {
    toast.error("Failed to delete product!");
    console.log(err);
  }
};

  const editProduct = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white">
<Toaster position="top-right" />
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

<div className="mt-auto pt-6">
  <button
    onClick={handleLogout}
    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-bold"
  >
    🚪 Logout
  </button>
</div>
</div>
      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6 uppercase">
          {activeTab}
        </h2>
<div className="w-full">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
      <h3 className="text-lg">📦 Products</h3>
      <p className="text-4xl font-bold mt-3">{totalProducts}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
      <h3 className="text-lg">🧾 Orders</h3>
      <p className="text-4xl font-bold mt-3">{orders.length}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
      <h3 className="text-lg">👤 Customers</h3>
      <p className="text-4xl font-bold mt-3">{totalCustomers}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
      <h3 className="text-lg">💰 Revenue</h3>
      <p className="text-4xl font-bold mt-3">₹{totalRevenue}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
      <h3 className="text-lg">✅ Delivered</h3>
      <p className="text-4xl font-bold mt-3">{deliveredOrders}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
      <h3 className="text-lg">⏳ Pending</h3>
      <p className="text-4xl font-bold mt-3">{pendingOrders}</p>
    </div>
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 mt-8">
  <h3 className="text-2xl font-bold mb-6">
    📊 Sales Analytics
  </h3>

  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip />
      <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

  </div>
)}
      
        {/* PRODUCTS */}
        {activeTab === "products" && (
<div className="flex gap-8 h-[80vh]">
  

            {/* FORM */}
            <div className="w-[380px] sticky top-6 self-start">
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
            </div>

            {/* PRODUCTS GRID */}
            {/* PRODUCTS GRID */}
<div className="flex-1 overflow-y-auto pr-2">
  <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">

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
</div>
{/* PAYMENTS */}
{activeTab === "payments" && (
  <div className="space-y-8">

    <div className="grid md:grid-cols-3 gap-40">

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
        <h3 className="text-lg font-bold">💰 Total Revenue</h3>
        <p className="text-3xl font-bold mt-3">₹{totalRevenue}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
        <h3 className="text-lg font-bold">✅ Delivered Revenue</h3>
        <p className="text-3xl font-bold mt-3">₹{deliveredRevenue}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
        <h3 className="text-lg font-bold">⏳ Pending Revenue</h3>
        <p className="text-3xl font-bold mt-3">₹{pendingRevenue}</p>
      </div>

    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
        <h3 className="text-lg font-bold">💳 Razorpay Payments</h3>
        <p className="text-3xl font-bold mt-3">{paidOrders}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
        <h3 className="text-lg font-bold">💵 Cash on Delivery</h3>
        <p className="text-3xl font-bold mt-3">{codOrders}</p>
      </div>
      </div>
      
{/* PAYMENT HISTORY */}
<div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">

  <h3 className="text-2xl font-bold mb-5">
    💳 Payment History
  </h3>

  <div className="overflow-x-auto">

    <table className="w-full text-left">

      <thead>
        <tr className="border-b border-white/20">
          <th className="py-3">Customer</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Order Status</th>
          <th>Payment</th>
        </tr>
      </thead>

      <tbody>

        {orders.map((order) => (

          <tr
            key={order._id}
            className="border-b border-white/10"
          >
            <td className="py-4">{order.userId}</td>

            <td>₹{order.totalAmount}</td>

            <td>{order.paymentMethod}</td>

            <td>{order.status}</td>

            <td>
              {order.paymentMethod === "ONLINE" ? (
                <span className="text-green-400 font-bold">
                  Paid
                </span>
              ) : (
                <span className="text-yellow-300 font-bold">
                  Pending
                </span>
              )}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
    </div>

  </div>
  



)}

        {/* USERS */}
        {activeTab === "users" && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">

  <table className="w-full">

    <thead className="bg-white/10">
      <tr>
        <th className="text-left p-4">Name</th>
        <th className="text-left p-4">Email</th>
        <th className="text-left p-4">Role</th>
      </tr>
    </thead>

    <tbody>

      {users.map((u, i) => (
        <tr
          key={i}
          className="border-t border-white/10 hover:bg-white/5 transition"
        >
          <td className="p-4 font-semibold">
            {u.name}
          </td>

          <td className="p-4 text-white/70">
            {u.email}
          </td>

          <td className="p-4">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
              {u.role || "Customer"}
            </span>
          </td>
        </tr>
      ))}

    </tbody>

  </table>

</div>

           

         
        )}
</div>
      </div>
  
  );
};

export default Admin;