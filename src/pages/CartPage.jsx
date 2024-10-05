import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeProductFromCart } from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  // Handle removing a product from the cart
  const handleRemove = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 my-8">Your Cart</h1>

      {/* Show loading status */}
      {status === 'loading' && <p className="text-blue-500">Loading...</p>}
      
      {/* Show error if there is one */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display cart items */}
      <ul className="w-full max-w-2xl space-y-4">
        {cart?.cart?.length > 0 ? (
          cart.cart.map((item) => (
            <li
              key={item.product._id} // Unique identifier for each product
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{item.product.name}</h3>
                <p className="text-gray-500">${item.product.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-600 font-semibold hover:text-red-800"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default CartPage;
