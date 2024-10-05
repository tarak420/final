import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
 console.log(user)
  // Redirect to admin login if the user is not an admin or not logged in
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin/login'); // Redirect to admin login page
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null; // Optionally, render nothing or a loader while redirecting
  }

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 pt-[7em]">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <h2 className="text-2xl text-gray-600 mb-4">Welcome, {user?.name}</h2>
        <p className="text-lg text-gray-500 mb-8">
          You have access to manage products, orders, and users.
        </p>

        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage:</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/admin/products"
                className="text-blue-500 hover:text-blue-700"
              >
                Manage Products
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Manage Orders
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Manage Users
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
