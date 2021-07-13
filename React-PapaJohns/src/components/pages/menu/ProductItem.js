import { Fragment, useState } from "react";

import ProductModal from "../../UI/ProductModal";

function ProductItem({ product, categoryName }) {
  const [modalShown, setModalShown] = useState(false);

  const showModalHandler = () => setModalShown(true);
  const closeModalHandler = () => setModalShown(false);

  return (
    <Fragment>
      <div className="product__card">
        <div>
          <img
            className="product__image"
            src={`assets/img/menu/${product.image}`}
            alt={product.name}
          />
        </div>
        <div
          className={
            product.details
              ? "product__content"
              : "product__content--alternative"
          }
        >
          <h2 className="product__title">{product.name}</h2>
          {product.details && (
            <p className="product__details">{product.details}</p>
          )}
          <button className="product__button" onClick={showModalHandler}>
            Bunu Seç
          </button>
        </div>
      </div>
      {modalShown && (
        <ProductModal product={product} onClose={closeModalHandler} />
      )}
    </Fragment>
  );
}

export default ProductItem;
