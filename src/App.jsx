import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import LoginPage from './components/HomeTest/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import Navbar from './components/shared/Navbar';
import Header from './components/shared/Header';
import HomeTest from './components/HomeTest';
import ProductDetails from './components/HomeTest/ProductDetails';
import ProductsPage from './components/HomeTest/ProductsPage';
import Profile from './components/HomeTest/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import MakeOrder from './components/HomeTest/MakeOrder';
import Orders from './components/HomeTest/Orders';
import OrderDetails from './components/HomeTest/OrderDetails';




const App = () => {
  return (
    <Router>
      {/* <Navbar/> */}
      {/* <Header /> */}
      <div className=''>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeTest />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/admin/login" element={<AdminLogin />}/>
          <Route path="/place-order" element={<MakeOrder />}/>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/orders/:id" element={<OrderDetails />}/>
          
          {/* Unauthorized route */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
