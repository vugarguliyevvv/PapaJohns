import { useReducer, useEffect } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type === "INITIALIZE") {
    return { ...action.cart };
  }

  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.count * action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        count: existingCartItem.count + action.item.count,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      })
    );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.count === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        count: existingCartItem.count - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      })
    );

    if (updatedItems.length === 0) {
      localStorage.removeItem("cart");
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    localStorage.removeItem("cart");
    return defaultCartState;
  }

  return defaultCartState;
}

function CartContexProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart) {
      dispatchCartAction({ type: "INITIALIZE", cart: JSON.parse(cart) });
    }
  }, []);

  function addItem(item) {
    dispatchCartAction({ type: "ADD", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR" });
  }

  const value = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContexProvider;
