import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import CartModal from "../../UI/CartModal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart({ onClose }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cart = useContext(CartContext);

  let totalAmount = cart.totalAmount;

  if (totalAmount % 1 > 0) {
    totalAmount = totalAmount.toFixed(1);
  }

  function cartItemAddHandler(item) {
    cart.addItem({ ...item, count: 1 });
  }

  function cartItemRemoveHandler(id) {
    cart.removeItem(id);
  }

  function openCheckoutHandler() {
    setIsCheckout(true);
  }

  const submitOrderHandler = async (userData) => {
    let orderItems = cart.items.map((item) => {
      return {
        name: item.name,
        size: item.size,
        quantity: item.count,
        price: item.price,
      };
    });

    await fetch("http://localhost:22695/api/basket", {
      method: "POST",
      body: JSON.stringify({
        ...userData,
        orderItems,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setDidSubmit(true);
    cart.clearCart();
  };

  const cartItems = (
    <ul className="cart-items">
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          categoryName={item.categoryName}
          count={item.count}
          price={item.price}
          size={item.size}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className="cart-total">
        <span>Toplam</span>
        <span>{totalAmount} azn</span>
      </div>
      {isCheckout && cart.items.length > 0 && (
        <Checkout onCancel={onClose} onSubmitOrder={submitOrderHandler} />
      )}
      {!isCheckout && (
        <div className="cart-actions">
          <button className="cart-close" onClick={onClose}>
            Bağla
          </button>
          {cart.items.length > 0 && (
            <button className="cart-order" onClick={openCheckoutHandler}>
              Sifariş Et
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  return (
    <CartModal onClose={onClose}>
      {!didSubmit && cartModalContent}
      {didSubmit && (
        <Fragment>
          <p className="submit-message">Sifarişiniz uğurla göndərildi!</p>
          <div className="cart-actions">
            <button className="cart-close" onClick={onClose}>
              Bağla
            </button>
          </div>
        </Fragment>
      )}
    </CartModal>
  );
}

export default Cart;
