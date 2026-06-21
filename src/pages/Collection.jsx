import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Collection() {
  const navigate = useNavigate();
  const { addToCart, message } = useContext(CartContext);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setAllProducts(res.data);

        const uniqueCategories = [
          "all",
          ...new Set(res.data.map((item) => item.category)),
        ];

        setCategories(uniqueCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (activeCategory === "all") {
      const map = new Map();

      filtered.forEach((item) => {
        if (!map.has(item.category)) {
          map.set(item.category, item);
        }
      });

      filtered = Array.from(map.values());
    }

    setFilteredProducts(filtered);
  }, [search, activeCategory, allProducts]);

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] px-6 py-10">

      {/* MESSAGE */}
      {message && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      {/* HEADER */}
      <div className="text-center mb-10">
        <p className="uppercase tracking-[6px] text-white/70 text-sm font-semibold">
          PrintifyHub Collection
        </p>

        <h1 className="text-5xl font-extrabold mt-3">
          Creative <span className="text-white/90">Products</span>
        </h1>

        <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">
          Explore premium custom printing products crafted with creativity and quality.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search amazing products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full max-w-2xl
            px-6 py-4
            rounded-full
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            text-white
            placeholder:text-white/60
            outline-none
            focus:border-white/40
            shadow-lg
          "
        />
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-4 overflow-x-auto pb-6 mb-10 scrollbar-hide">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-6 py-3 rounded-full whitespace-nowrap transition
              border border-white/20
              backdrop-blur-md
              ${
                activeCategory === cat
                  ? "bg-white text-[#4b2cff] font-bold shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }
            `}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-white/70 mt-20 text-xl">
          No products found 😢
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="
                bg-white/10
                backdrop-blur-xl
                border border-white/20
                rounded-3xl
                overflow-hidden
                shadow-xl
                transition duration-300
                relative
              "
            >

              {/* WISHLIST */}
             <button
  onClick={() => toggleWishlist(item)}
  className="absolute top-4 right-4 z-10 bg-black/30 p-2 rounded-full backdrop-blur-md"
>
                {isInWishlist(item._id) ? (
                  <FaHeart className="text-pink-400 text-lg" />
                ) : (
                  <FaRegHeart className="text-white text-lg" />
                )}
              </button>

              {/* IMAGE */}
              <div className="overflow-hidden">
  <img
    src={`http://localhost:5000${item.image}`}
    alt={item.name}
    className="w-full h-64 object-cover transition duration-500 hover:scale-110"
  />
</div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-xl font-bold truncate">
                  {item.name}
                </h3>

                <p className="text-white/80 text-lg font-semibold mt-2">
                  ₹{item.price}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="flex-1 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 py-3 rounded-xl bg-white text-[#4b2cff] font-bold hover:scale-105 transition"
                  >
                    Add
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}