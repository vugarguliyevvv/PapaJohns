import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className='cart-modal__backdrop' onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className='cart-modal__content'>
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const CartModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default CartModal;