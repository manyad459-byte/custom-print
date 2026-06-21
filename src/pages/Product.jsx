import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Product.css";
import { CartContext } from "../context/CartContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, message } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="product-container">
      <h2 className="title">Our Products</h2>

      {/* ✅ SUCCESS MESSAGE */}
      {message && (
        <div className="toast">
          {message}
        </div>
      )}

      <div className="product-grid">
        {products.map((item) => (
          <div
            key={item._id}
            className="product-card"
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p className="desc">{item.description}</p>
            <h4 className="price">₹{item.price}</h4>

            {/* ADD TO CART */}
            <button
              onClick={()=>{
                console.log("CLICKED",product);
                addToCart(product);
              }}
              >Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;