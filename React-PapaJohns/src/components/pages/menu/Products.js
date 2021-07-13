import { useContext } from "react";

import MenuContext from "../../store/menu-context";
import ProductItem from "./ProductItem";

function Products() {
  const { activeCategory } = useContext(MenuContext);
  const products = activeCategory.products;

  let classes = "products__grid--4";

  if (products.length === 3) classes = "products__grid--3";
  if (products.length === 2) classes = "products__grid--2";
  if (products.length === 1) classes = "products__grid--1";

  const productItems = products.map((product) => {
    return <ProductItem key={product.id} product={product} />;
  });

  return <div className={classes}>{productItems}</div>;
}

export default Products;
