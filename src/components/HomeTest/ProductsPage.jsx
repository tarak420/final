import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import { addProductToCart } from '../../features/cart/cartSlice';
import { addNotification } from '../../features/notifications/notificationSlice';
import Header from '../shared/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterCard from './FilterCard';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  
  const searchQuery = queryParams.get('search') || ''; // Extract search from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, pagination } = useSelector((state) => state.products);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products on component mount and when filters change
  useEffect(() => {
    // Reset the product list when filters change
    setAllProducts([]);
    setCurrentPage(1);

    dispatch(fetchProducts({ search: searchQuery, category: selectedCategory, page: 1 }))
      .then((action) => {
        if (action.payload?.products) {
          setAllProducts(action.payload.products);  // Load only the first page of products
        }
      });
  }, [dispatch, searchQuery, selectedCategory]); // Re-fetch when searchQuery or selectedCategory changes

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const item = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.productImage,
    };

    dispatch(addProductToCart(item));

    dispatch(
      addNotification({
        id: Date.now(),
        message: `${product.name} added to the cart!`,
        type: 'success',
      })
    );
  };

  // Handle "Load More" button click
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;  // Determine the next page

    dispatch(fetchProducts({ search: searchQuery, category: selectedCategory, page: nextPage }))
      .then((action) => {
        if (action.payload?.products) {
          const newProducts = action.payload.products.filter(
            (newProduct) => !allProducts.some((existingProduct) => existingProduct._id === newProduct._id)
          );
          setAllProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setCurrentPage(nextPage);  // Update the current page
        }
      });
  };

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
          
          {
             status === 'loading' && allProducts.length === 0 && (
               <div className="flex items-center justify-center h-screen">
                 <p className="text-xl">Loading...</p>
               </div>
             )
          }
          {
             status === 'failed' && (
              <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-red-600">Error: {error}</p>
              </div>
            )
          }
          {/* Products List */}
          <div className="products-container ml-[23em] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allProducts.length === 0 ? (
              <div className="col-span-4 text-center py-10">
                <p className="text-lg">No products found.</p>
              </div>
            ) : (
              allProducts.map((item, idx) => (
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
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* "Load More" Button */}
        {currentPage < pagination.totalPages && (
          <div className="load-more mt-5 flex justify-center items-center">
            <button
              className="btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleLoadMore}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
