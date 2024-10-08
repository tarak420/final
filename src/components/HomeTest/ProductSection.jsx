import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import { addProductToCart } from '../../features/cart/cartSlice';

const ProductSection = () => {
  const dispatch = useDispatch();
  const { products = [], status, error } = useSelector((state) => state.products); // Ensure products has a default empty array

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts({ search: '', category: '' })); // Provide default search and category parameters if needed
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

    dispatch(addProductToCart(item));
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
    <section className="products">
      <h1 className="heading">Our <span>Products</span></h1>
      <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.slice(0, 8).map((item, idx) => (
            <div className="product-card border p-4 rounded-lg shadow-lg" key={idx}>
              <img src={item.productImage} alt={item.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="mt-2 text-lg font-semibold">{item.name}</h2>
              <div className="price mt-1 text-xl font-bold">${item.price}</div>
              <div className="stars mt-1">⭐⭐⭐⭐⭐</div>
              <button className="btn mt-2 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
