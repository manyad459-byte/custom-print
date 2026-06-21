import { useEffect } from "react";
import { FaItalic } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Welcome = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);
  // HomePage.jsx

  return (
    <div>
      <h1>Welcome to PrintifyHub</h1>
      <button onClick={() => navigate("/orders")}>
        Order Now
      </button>
    </div>
  );
}

export default Welcome;


  