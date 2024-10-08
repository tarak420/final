import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../features/orders/ordersSlice';
import { clearCart } from '../../features/cart/cartSlice'; // Clear the cart after successful order
import { unwrapResult } from '@reduxjs/toolkit';
import Header from '../shared/Header';
import { addNotification } from '../../features/notifications/notificationSlice';

const MakeOrder = () => {
  const dispatch = useDispatch();

  // Fetch cart items from state
  const cart = useSelector((state) => state?.cart?.cart);
  const userId = useSelector((state) => state.auth?.user?._id);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      userId,
      products: cart, // Cart items
      totalAmount,
      shippingAddress,
      paymentMethod,
    };

    try {
      // Dispatch createOrder and wait for successful response
      const resultAction = await dispatch(createOrder(orderData));
      unwrapResult(resultAction); // Unwrap to handle any errors properly

      dispatch(
        addNotification({
          id: Date.now(),
          message: ` Order Placed Sucessfully`,
          type: 'failed',
        })
      );
      dispatch(clearCart()); // Clear the cart
    } catch (err) {
      dispatch(
        addNotification({
          id: Date.now(),
          message: ` Order failed ! Please Login first`,
          type: 'failed',
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[20em]">
      <Header />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg ">
        <h1 className="text-2xl font-bold text-center mb-6">Review Your Order</h1>

        <div className="cart-items mb-6">
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item flex justify-between py-2 border-b border-gray-300">
              <p className="text-gray-700">{item.name} (x{item.quantity})</p>
              <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="total mt-4">
            <strong className="text-lg">Total: ${totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        <form className="order-form" onSubmit={handleSubmitOrder}>
          <div className="form-group mb-4">
            <label htmlFor="shippingAddress" className="block text-gray-700 font-medium mb-1">Shipping Address</label>
            <input
              type="text"
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              className="input border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-1">Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input border border-gray-300 p-2 rounded w-full"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeOrder;
