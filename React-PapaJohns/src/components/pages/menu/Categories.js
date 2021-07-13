import { useContext } from "react";

import MenuContext from "../../store/menu-context";

function Categories() {
  const { categories, activeCategory, changeActiveCategoryHandler } =
    useContext(MenuContext);

  return (
    <div className="categories">
      {categories.map((category) => {
        return (
          <h2
            className={`category ${
              category.id === activeCategory.id ? "category-active" : ""
            }`}
            key={category.id}
            onClick={changeActiveCategoryHandler.bind(null, category)}
          >
            {category.name}
          </h2>
        );
      })}
    </div>
  );
}

export default Categories;
