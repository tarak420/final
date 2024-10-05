import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/orders/ordersSlice';
import Header from '../shared/Header';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency'; // Optional helper for formatting prices

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch orders from the Redux state
  const { orders = [], status, error } = useSelector((state) => state?.orders);
  const userId = useSelector((state) => state?.auth?.user?._id); // Assume you have user info in auth state

  // Fetch orders when the component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <section className="orders mt-5 pt-[7rem]">
        <h1 className="heading text-2xl font-bold">
          Your <span className="text-blue-500">Orders</span>
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-lg">
            <p>You have no orders yet.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="orders-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order,idx) => (
              <div key={order._id} className="order-card p-4 rounded-lg shadow-lg border border-gray-300">
                <h2 className="text-lg font-semibold">Order #{idx+1}</h2>
                <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

                <div className="products mt-4">
                  {Array.isArray(order?.orderItems) && order?.orderItems?.length > 0 ? (
                    order?.orderItems?.map((product) => (
                      <div key={product._id} className="product-item flex justify-between">
                        <p>{product.name} (x{product.quantity})</p>
                        <p>{formatCurrency(product.price * product.quantity)}</p>
                      </div>
                    ))
                  ) : (
                    <p>No products in this order.</p>
                  )}
                </div>

                <div className="mt-4">
                  <p className="font-bold">Total: {formatCurrency(order.totalAmount)}</p>
                  <p className={`mt-2 text-sm ${
                    order.status === 'Delivered'
                      ? 'text-green-600'
                      : order.status === 'Processing'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    Status: {order.status}
                  </p>
                </div>

                <button
                  className="btn mt-4 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
