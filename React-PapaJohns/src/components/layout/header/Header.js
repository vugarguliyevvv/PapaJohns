import { useState } from 'react';

import Logo from './Logo';
import Navigation from './Navigation';
import Bars from './Bars';
import CartButton from './CartButton/CartButton';
import Cart from '../cart/Cart';

function Header() {
    const [navIsActive, setNavIsActive] = useState(false);
    const [cartIsActive, setCartIsActive] = useState(false);
    
    function toggleNavHandler() {
        setNavIsActive(prevState => !prevState);
    }

    function showCartHandler() {
        setCartIsActive(true);
    }

    function hideCartHandler() {
        setCartIsActive(false);
    }

    return <header className='header'>
        <Logo />
        <Navigation isActive={navIsActive} />
        <Bars onToggleNav={toggleNavHandler} isOpened={navIsActive} />
        <CartButton onShowCart={showCartHandler} />
        {cartIsActive && <Cart onClose={hideCartHandler} />}
    </header>
}

export default Header;