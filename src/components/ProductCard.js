import { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { cart, dispatch } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const [toast, setToast] = useState("");

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", product });
    setToast("Added to cart ✅");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.title} />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">${product.price}</p>

      {isInCart ? (
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => dispatch({ type: "DECREASE_QUANTITY", product })}
          >
            -
          </button>

          <span className="quantity-value">{cartItem.quantity}</span>

          <button
            className="quantity-btn"
            onClick={() => dispatch({ type: "INCREASE_QUANTITY", product })}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}

      {toast && <p className="toast-message">{toast}</p>}
    </div>
  );
}

export default ProductCard;