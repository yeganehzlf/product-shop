import { createContext, useContext, useReducer } from "react";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();

const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error reading cart from localstorage", error);
        return [];
    }
};

function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };