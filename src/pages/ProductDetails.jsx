import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);

  const { addToCart, message } = useContext(CartContext);

  // ✅ Fetch single product
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ Fetch all products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Similar products
  const similarProducts = allProducts
    .filter(
      (item) =>
        item.category === product?.category &&
        item._id !== product?._id
    )
    .slice(0, 5);

  // ✅ Auto slider
  useEffect(() => {
    if (!similarProducts.length || paused) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + 1 >= similarProducts.length ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [similarProducts, paused]);

  // ✅ Loading
  if (!product)
    return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* MESSAGE */}
      {message && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">

            <div className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              ✓
            </div>

            <span className="font-medium">
              {message}
            </span>

          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-[400px] h-[400px] object-cover rounded-xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500">
            {product.category}
          </p>

          <div className="text-yellow-400 my-2 text-lg">
            ★★★★☆
          </div>

          <div className="flex items-center gap-3 my-3">

            <span className="text-2xl font-semibold text-blue-600">
              ₹{product.price}
            </span>

            <span className="line-through text-gray-400">
              ₹{product.price + 100}
            </span>

            <span className="text-green-600 font-medium">
              20% OFF
            </span>

          </div>

          <p className="text-green-600 font-medium">
            ✔ Free Delivery by Tomorrow
          </p>

          <p className="text-gray-600 mb-2">
            🚚 Cash on Delivery Available
          </p>

          <p className="text-green-600 font-semibold mb-4">
            In Stock
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">

            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              Premium
            </span>

            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              Customizable
            </span>

            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
              Best Gift
            </span>

          </div>

          {/* DESCRIPTION */}
          <div className="text-gray-700 leading-relaxed mb-4">

            <h3 className="font-semibold text-lg mb-1">
              Description
            </h3>

            <p>
              {product.description ||
                `This premium ${product.name} is designed for everyday use and gifting.
                Crafted with high-quality materials, it offers durability, style, and comfort.
                Perfect for personal use or as a thoughtful gift.`}
            </p>

          </div>

          {/* FEATURES */}
          <div className="mb-4">

            <h3 className="font-semibold text-lg mb-1">
              Features
            </h3>

            <ul className="list-disc pl-5 text-gray-700">
              <li>High-quality material</li>
              <li>Durable and long-lasting</li>
              <li>Modern and stylish design</li>
              <li>Perfect for gifting</li>
            </ul>

          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-5">

            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span className="text-lg">
              {qty}
            </span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            {/* ADD TO CART */}
            <button
              onClick={() => {
                addToCart({
                  _id: product._id,
                  product: product.name,
                  price: product.price,
                  preview: `http://localhost:5000${product.image}`,
                  quantity: qty,
                });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              onClick={() => {
                addToCart({
                  _id: product._id,
                  product: product.name,
                  price: product.price,
                  preview: `http://localhost:5000${product.image}`,
                  quantity: qty,
                });

                navigate("/checkout");
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Buy Now
            </button>

          </div>

          {/* EXTRA */}
          <div className="mt-5 text-sm text-gray-600">
            <p>✔ Secure Payment</p>
            <p>✔ 7 Days Replacement</p>
            <p>✔ Quality Assured</p>
          </div>

        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Similar Products
        </h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* LEFT */}
          <button
            onClick={() =>
              setIndex((prev) =>
                prev === 0 ? similarProducts.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow px-3 py-1 rounded z-10"
          >
            ◀
          </button>

          {/* RIGHT */}
          <button
            onClick={() =>
              setIndex((prev) =>
                prev + 1 >= similarProducts.length ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow px-3 py-1 rounded z-10"
          >
            ▶
          </button>

          {/* SLIDER */}
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * 420}px)`
            }}
          >

            {similarProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="min-w-[400px] mr-5 bg-white p-2 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              >

                <img
                  src={`http://localhost:5000${item.image}`}
                  className="w-full h-[400px] object-cover rounded-md"
                />

                <p className="text-sm mt-2 truncate">
                  {item.name}
                </p>

                <p className="text-sm text-blue-600">
                  ₹{item.price}
                </p>

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}