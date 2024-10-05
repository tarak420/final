import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full bg-blue-600 p-4 z-50">
      <div className="container mx-auto flex justify-between items-center mx-w-7xl">
        <Link to="/" className="text-white text-lg font-bold">E-Commerce</Link>
        
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/products" className="text-white hover:underline">Products</Link>
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin/dashboard" className="text-white hover:underline">Admin Dashboard</Link>
              )}
              <Link to="/cart" className="text-white hover:underline">Cart</Link>
              <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 p-4">
          <Link to="/" className="block text-white hover:underline">Home</Link>
          <Link to="/products" className="block text-white hover:underline">Products</Link>
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin/dashboard" className="block text-white hover:underline">Admin Dashboard</Link>
              )}
              <Link to="/cart" className="block text-white hover:underline">Cart</Link>
              <button onClick={handleLogout} className="block text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white hover:underline">Login</Link>
              <Link to="/signup" className="block text-white hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
