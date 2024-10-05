import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; // Adjust the path as needed
import Header from '../shared/Header';

const Profile = () => {
  const user = useSelector((state) => state.auth.user); // Access the user from Redux state
  const dispatch = useDispatch(); // Hook to access the dispatch function

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex justify-center bg-gray-100 p-8 pt-[12em]">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Page</h1>
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center text-green-600 text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              {/* Add other profile details here */}
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-gray-600">Please log in to view your profile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
