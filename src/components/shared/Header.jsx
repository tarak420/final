import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; // Logout action from the auth slice
import SearchComp from '../HomeTest/Search';
import Cart from '../HomeTest/Cart';
import "./nav.css";

const Header = ({ featureRef, scrollToSection, categoryRef, reviewRef, homeRef }) => {
  const [activeComponent, setActiveComponent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user); // Access the user from Redux state
  const cartItems = useSelector((state) => state.cart); // Access the cart items from Redux state
  console.log('cart:',cartItems)
  // Toggle components
  const toggleComponent = (component) => {
    if (activeComponent === component) {
      setActiveComponent(''); // Close if already open
    } else {
      setActiveComponent(component); // Open the new component
    }
  };

  return (
    <>
      <header className="header fixed top-0 z-50 w-full flex justify-between items-center p-4 shadow-lg bg-white">
        
        <div onClick={()=>{ navigate('/');  scrollToSection(homeRef)}} className='cursor-pointer text-[14px] flex items-center justify-center gap-3'>
          <i className="fa-solid fa-cart-plus text-[20px] text-green-600"></i>
          <div>
            <div className='text-yellow-600 font-bold'>NATURALLY</div>
            <div className='text-[10px] text-green-600 font-bold '> Yours Market</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          className={`navbar ${activeComponent === 'menu' ? 'block active z-20' : 'hidden'} md:flex md:space-x-6 absolute md:static w-full bg-white md:w-auto p-4 md:p-0`}
        >
          <Link className="link block p-4 md:p-0 nav" to="/" onClick={() => scrollToSection(homeRef)}>Home</Link>
          <Link className="link block p-4 md:p-0 nav" to="#features" onClick={() => scrollToSection(featureRef)}>Features</Link>
          <Link className="link block p-4 md:p-0 nav" to="/products">Products</Link>
          <Link className="link block p-4 md:p-0 nav" to="#categories" onClick={() => scrollToSection(categoryRef)}>Categories</Link>
          <Link className="link block p-4 md:p-0 nav" to="#review" onClick={() => scrollToSection(reviewRef)}>Review</Link>
          <Link className="link block p-4 md:p-0 nav" to="/orders">Orders</Link>
        </nav>

        {/* Icons for Search, Cart, Login/Profile */}
        <div className="icons flex gap-3">
          <Menu className="icon md:hidden block cursor-pointer" onClick={() => toggleComponent('menu')} />
          <Search className="icon cursor-pointer" onClick={() => toggleComponent('search')} />

          {/* Cart Icon with Cart Item Count */}
          <div className="relative cursor-pointer" onClick={() => toggleComponent('cart')}>
            <ShoppingCart className="icon" />
            {cartItems?.cart?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-md px-2 py-1">
                {cartItems?.cart.length}
              </span>
            )}
          </div>

          {/* If user is logged in, show profile link; else, show login icon */}
          {user ? (
            <Link to="/profile" className="icon cursor-pointer">
              <User />
            </Link>
          ) : (
            <User className="icon cursor-pointer" onClick={() => navigate('/login')} />
          )}
        </div>
      </header>

      {/* Render Search, Cart, and Login Form components */}
      <SearchComp isOpen={activeComponent === 'search'} toggleSearch={() => toggleComponent('search')} />
      <Cart isOpen={activeComponent === 'cart'} toggleCart={() => toggleComponent('cart')} />
    </>
  );
};

export default Header;
