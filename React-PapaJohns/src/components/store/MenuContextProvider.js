import { useState, useEffect, useCallback } from "react";

import MenuContext from "./menu-context";

function MenuContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({ products: [] });

  function changeActiveCategoryHandler(category) {
    if (activeCategory.id !== category.id) {
      fetchCategory(category.id);
    }
  }

  const fetchCategory = useCallback((id) => {
    fetch(`http://localhost:22695/api/menu/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActiveCategory(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:22695/api/menu")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        fetchCategory(data[0].id);
      });
  }, [fetchCategory]);

  const value = {
    categories,
    activeCategory,
    changeActiveCategoryHandler,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export default MenuContextProvider;
