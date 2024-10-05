import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../features/orders/ordersSlice'; // Assume you have this action
import Header from '../shared/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the order ID from the URL parameters
  console.log('Order ID:', id);

  // Fetch order details from the Redux state
  const { order, status, error } = useSelector((state) => state.orders);

  // Fetch order details when the component mounts
  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <section className="order-details mt-5 pt-[7rem]">
        <h1 className="heading text-2xl font-bold">
          Order Details <span className="text-blue-500">#{order._id}</span>
        </h1>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Products</h2>
          {Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
            <div className="products mt-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="product-item flex justify-between">
                  <p>{item.name} (x{item.quantity})</p>
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No products in this order.</p>
          )}

          <div className="mt-4">
            <p className="font-bold">Total: {formatCurrency(order.totalAmount)}</p>
            <p className={`mt-2 text-sm ${
              order.status === 'Delivered'
                ? 'text-green-600'
                : order.status === 'Shipped'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}>
              Status: {order.status}
            </p>
            <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Shipping Address: {order.shippingAddress}</p>
            <p className="text-sm text-gray-500">Payment Method: {order.paymentMethod}</p>
          </div>

          <button
            className="btn mt-4 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => navigate('/orders')}
          >
            Back to Orders
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
