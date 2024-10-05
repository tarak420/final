import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import { addProductToCart } from '../../features/cart/cartSlice';
import { addNotification } from '../../features/notifications/notificationSlice'; // Import the notification action
import Header from '../shared/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FilterCard from './FilterCard'; // Import the FilterCard component

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const searchQuery = queryParams.get('search') || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const item = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.productImage,
    };

    // Dispatch action to add product to cart
    dispatch(addProductToCart(item));

    // Dispatch notification for success
    dispatch(
      addNotification({
        id: Date.now(),
        message: `${product.name} added to the cart!`,
        type: 'success',
      })
    );
  };

  // Filter products based on category and search query
  const filteredProducts = products
    ?.filter((product) =>
      product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    ?.filter((product) =>
      selectedCategory ? product?.category?.toLowerCase() === selectedCategory.toLowerCase() : true
    );

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
    <div>
      <Header />
      <section className="products mt-5 pt-[7rem]">
        <h1 className="heading">
          Our <span>Products</span>
        </h1>
        <div className="flex">
          {/* FilterCard for Category Selection */}
          <FilterCard selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          
          {/* Products List */}
          <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts?.map((item, idx) => (
              <div
                onClick={() => navigate('/products/' + item?._id)}
                className="product-card border p-4 rounded-lg shadow-lg"
                key={idx}
              >
                <img
                  src={item.productImage}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="mt-2 text-lg font-semibold">{item.name}</h2>
                <div className="price mt-1 text-xl font-bold">${item.price}</div>
                <div className="stars mt-1">⭐⭐⭐⭐⭐</div>
                <button
                  className="btn mt-2 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click
                    handleAddToCart(item);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
