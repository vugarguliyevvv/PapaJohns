import React from "react";

const MenuContext = React.createContext({
  categories: [],
  activeCategory: { products: [] },
  changeCategoryHandler: (category) => {},
});

export default MenuContext;
