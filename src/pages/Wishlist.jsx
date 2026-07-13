import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  return (
       <div className="min-h-screen bg-gradient-to-r from-[#7b5cff] via-[#4b2cff] to-[#2b0fff] text-white px-6 py-28">

      {/* HEADING */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[6px] text-pink-400 text-sm font-semibold">
          Favorite Products
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
          My <span className="text-pink-500">Wishlist</span>
        </h1>

        <p className="text-gray-300 mt-5 text-lg">
          Save your favorite products and shop later.
        </p>

      </div>

      {/* EMPTY */}
      {wishlist.length === 0 ? (

        <div
          className="
            max-w-xl
            mx-auto
            text-center
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-14
            shadow-2xl
          "
        >
          <div className="text-7xl mb-6">💔</div>

          <h2 className="text-3xl font-bold mb-4">
            Wishlist Empty
          </h2>

          <p className="text-gray-300 mb-8">
            You haven’t added any products yet.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="
              px-8
              py-4
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              hover:scale-105
              transition
              font-semibold
              shadow-lg
            "
          >
            Browse Products
          </button>
        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
            max-w-7xl
            mx-auto
          "
        >

          {wishlist.map((item) => (

            <div
              key={item._id}
              className="
                relative
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                overflow-hidden
                shadow-2xl
                hover:-translate-y-2
                hover:shadow-purple-500/20
                transition-all
                duration-300
                group
              "
            >

              {/* HEART */}
              <button
                onClick={() => toggleWishlist(item)}
                className="
                  absolute
                  top-4
                  right-4
                  z-10
                  w-10
                  h-10
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  text-pink-500
                  hover:scale-110
                  transition
                "
              >
                <FaHeart />
              </button>

              {/* IMAGE */}
              <div
                onClick={() => navigate(`/product/${item._id}`)}
                className="overflow-hidden cursor-pointer"
              >
                <img
                  src={`https://custom-print-backend.onrender.com${item.image}`}
                  alt={item.name}
                  className="
                    w-full
                    h-72
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-xl font-bold truncate">
                  {item.name}
                </h2>

                <p className="text-pink-400 text-lg font-semibold mt-2">
                  ₹{item.price}
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col gap-3 mt-6">

                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="
                      w-full
                      py-3
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      hover:bg-white/10
                      transition
                    "
                  >
                    View Product
                  </button>

                  <button
                    onClick={() => {
                      addToCart(item);
                      toggleWishlist(item);
                    }}
                    className="
                      w-full
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-pink-500
                      to-purple-600
                      hover:scale-[1.02]
                      transition
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <FaShoppingCart />
                    Move To Cart
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