import { NavLink } from "react-router-dom";

function Navigation({ isActive }) {
  return (
    <nav className={`nav ${!isActive ? "nav__toggle" : ""}`}>
      <NavLink to='/' exact className='nav__link' activeClassName='nav__link--active'>ƏSAS SƏHİFƏ</NavLink>
      <NavLink to='/about' className='nav__link' activeClassName='nav__link--active'>HAQQIMIZDA</NavLink>
      <NavLink to='/menu' className='nav__link' activeClassName='nav__link--active'>MENYU</NavLink>
      <NavLink to='/branches' className='nav__link' activeClassName='nav__link--active'>FİLİALLAR</NavLink>
    </nav>
  );
}

export default Navigation;