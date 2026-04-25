import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // loading spinner
import "./App.css";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import { useCart } from "./context/CartContext";

function App() {
  // local UI state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);

  // global cart state from context
  const { cart } = useCart();

  // fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // run on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts();
  }, []);

  // persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // calculate total items in cart
  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app-container">
      {/* Header */}
      <header className="top-bar">
        <h1 className="page-title">Product List</h1>

        {/* Cart Icon */}
        <div
          className="cart-icon-container"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingCart className="cart-icon" />
          {totalCartItems > 0 && (
            <span className="cart-item-count">{totalCartItems}</span>
          )}
        </div>
      </header>

      {/* Loading State */}
      {loading && (
        <div className="loader-container">
          <ClipLoader size={50} color="#007bff" />
        </div>
      )}

      {/* Error State */}
      {error && <p className="status-message error-message">{error}</p>}

      {/* Cart View */}
      {showCart && <Cart />}

      {/* Product Grid */}
      <ul className="product-container">
        {products.map((product) => (
          <li key={product.id} className="product-list-item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;