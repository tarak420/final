import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; // Logout action from the auth slice

const ProfileDropdown = ({ user, onLogout }) => {
  return (
    <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 z-50">
      <p className="font-semibold">Welcome, {user.name}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
      <button
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
