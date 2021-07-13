import { Fragment, useState, useContext } from "react";

import MenuContext from "../store/menu-context";
import CartContext from "../store/cart-context";

import ReactDOM from "react-dom";

function ProductDetails({ product, onClose }) {
  const { activeCategory } = useContext(MenuContext);
  const cart = useContext(CartContext);

  let { id, price } = product;

  const [size, setSize] = useState("Standart");
  const [count, setCount] = useState(1);

  let updatedPrice = price;

  if (size === "Kiçik") {
    id += "small";
    updatedPrice -= 3;
  } else if (size === "Böyük") {
    id += "big";
    updatedPrice += 3;
  }

  let totalAmount = updatedPrice * count;

  if (price % 1 > 0) {
    totalAmount = totalAmount.toFixed(1);
  }

  function increment() {
    setCount((count) => count + 1);
  }

  function decrement() {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  }

  function submitHandler(e) {
    e.preventDefault();

    cart.addItem({
      id,
      name: product.name,
      categoryName: activeCategory.name,
      price: updatedPrice,
      count,
      size,
    });
  }

  return (
    <Fragment>
      <span className="product-modal__close" onClick={onClose}>
        Bağla <i className="fas fa-times"></i>
      </span>
      <div className="image-holder">
        <img src={`assets/img/menu/${product.image}`} alt={product.name} />
      </div>
      <form className="product-modal__form" onSubmit={submitHandler}>
        <div className="form-control">
          {activeCategory.name === "PİZZA" && (
            <select
              className="form-select"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="Kiçik">Kiçik, 23 sm - {price - 3} AZN</option>
              <option value="Standart">Orta, 30 sm - {price} AZN</option>
              <option value="Böyük">Böyük, 35 sm - {price + 3} AZN</option>
            </select>
          )}
        </div>
        <div className="form-control">
          <div className="counter">
            <button type="button" onClick={decrement}>
              <i className="fas fa-minus"></i>
            </button>
            <span className="count">{count}</span>
            <button type="button" onClick={increment}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <span className="total-amount">{totalAmount} azn</span>
        </div>
        <div className="form-control">
          <button className="add-to-cart">Səbətə At</button>
        </div>
      </form>
    </Fragment>
  );
}

function ProductModal({ product, onClose }) {
  return ReactDOM.createPortal(
    <div className="product-modal__backdrop">
      <div className="product-modal__content">
        <ProductDetails product={product} onClose={onClose} />
      </div>
    </div>,
    document.getElementById("overlays")
  );
}

export default ProductModal;
