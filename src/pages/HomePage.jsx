import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import { addProductToCart } from '../features/cart/cartSlice'; // Import the addProductToCart thunk

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    dispatch(addProductToCart({
      productId: product._id,
      quantity: 1, // Add 1 item to the cart
    }));
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={product.productImage}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-700 mt-2">Price: <span className="font-bold">${product.price}</span></p>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-500 mt-2">Stock: {product.stock}</p>
            </div>
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <button
                onClick={() => handleAddToCart(product)} // Add product to cart on click
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
