import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice'; // Import your logout action

const AdminHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/admin/dashboard" className="text-2xl font-bold text-[#342d71]">
          Admin Dashboard
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6 text-gray-600">
        <Link to="/admin/products" className="hover:text-gray-800">
          Manage Products
        </Link>
        <Link to="#" className="hover:text-gray-800">
          Manage Orders
        </Link>
        <Link to="#" className="hover:text-gray-800">
          Manage Users
        </Link>
      </nav>

      {/* User Profile and Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
