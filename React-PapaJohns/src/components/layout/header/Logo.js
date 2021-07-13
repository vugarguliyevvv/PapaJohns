import { Link } from 'react-router-dom';

function Logo() {
    return (
        <Link to='/' className='logo-box'>
            <img className='logo' src="assets/img/logo.png" alt="Logo" />
        </Link>
    );
}

export default Logo;