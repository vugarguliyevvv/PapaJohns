import { useContext } from 'react';

import CartContext from '../../../store/cart-context';
import CartIcon from './CartIcon';

function CartButton({ onShowCart }) {
  const cart = useContext(CartContext);

  const numberOfItems = cart.items.reduce((current, item) => {
    return current + item.count;
  }, 0);

  return (
    <button className='cart-button' onClick={onShowCart}>
      <span className='cart-button__icon'>
        <CartIcon />
      </span>
      <span className='cart-button__text'>Səbət</span>
      <span className='cart-button__badge'>{ numberOfItems }</span>
    </button>
  );
};

export default CartButton;