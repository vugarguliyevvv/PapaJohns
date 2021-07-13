const CartItem = (props) => {
  const { name, categoryName, size, price, count, onAdd, onRemove } = props;

  return (
    <li className="cart-item">
      <div>
        <div className="description">
          <h2>{name}</h2>
          {categoryName === "PİZZA" && <h3>{size}</h3>}
        </div>
        <div className="summary">
          <span className="price">{price} azn</span>
          <div className="counter">
            <button type="button" onClick={onRemove}>
              <i className="fas fa-minus"></i>
            </button>
            <span className="count">{count}</span>
            <button type="button" onClick={onAdd}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
