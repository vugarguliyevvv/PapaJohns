import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removdeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
