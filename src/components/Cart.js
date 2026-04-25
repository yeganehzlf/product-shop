import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, dispatch } = useCart();
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty 🛒</p>
      ) : (
        <>
          <p className="cart-summary">
            You have {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
          </p>

          <ul className="cart-list">
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{product.title}</h3>
                  <p className="cart-item-price">${product.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => dispatch({ type: "DECREASE_QUANTITY", product})}
                  >
                    -
                  </button>

                  <span className="quantity-value">{product.quantity}</span>

                  <button
                    className="quantity-btn"
                    onClick={() => dispatch({ type: "INCREASE_QUANTITY", product })}
                  >
                    +
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch({ type: "REMOVE_FROM_CART", product })}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <h3 className="cart-total">Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;