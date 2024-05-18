import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Chatbots from '../Chatbot.js';

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);

    return (
        <div className="navbar" id="nav">
            <div className="nav-logo">
                <Link className="nav-logo-link" to="/">
                    <img src={logo} style={{ marginRight: '10px' }} alt='' />
                    <p>ShopCart</p>
                </Link>
            </div>
            <ul className="nav-menu">
                <li><Link to='/'>Shop</Link></li>
                <li><Link to='/men'>Men</Link></li>
                <li><Link to='/women'>Women</Link></li>
                <li><Link to='/kids'>Kids</Link></li>
                <li><Link to='/Admin'>Admin</Link></li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button className='log_btn'>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} className='cart' alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
            <Chatbots /> {/* Add the Chatbot component here */}

        </div>
    )
}

export default Navbar;
