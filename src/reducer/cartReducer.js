const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART" :
        const existingProduct = state.find(item => item.id === action.product.id);
        if (existingProduct) {
          return state.map(item =>
            item.id === action.product.id
            ? {...item, quantity: item.quantity + 1}
            : item
          );
        }
        return [...state, {...action.product, quantity: 1}];
      case "INCREASE_QUANTITY":
        return state.map(item => 
          item.id === action.product.id
          ? { ...item, quantity: item.quantity +1 }
          :item
        );
      case "DECREASE_QUANTITY":
        return state.map(item => 
          item.id === action.product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity -1 }
          :item
        );

      case "REMOVE_FROM_CART":
        return state.filter(item => item.id !== action.product.id);
      default:
        return state;
        
    }
  };

  export default cartReducer;