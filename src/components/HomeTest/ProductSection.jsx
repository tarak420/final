import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import { addProductToCart } from '../../features/cart/cartSlice';

const ProductSection = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const item = {
      productId: product._id, // Assume product has an id
      name: product.name,
      price: product.price,
      quantity: 1, // Set the quantity to 1 by default
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
      <h1 className='heading'>Our <span>Products</span></h1>
      <div className="products-container">
        {products && products.slice(0,8).map((item, idx) => (
          <div className="product-card" key={idx}>
            <img src={item.productImage} alt={item.name} />
            <h2>{item.name}</h2> {/* Use item.name for dynamic product names */}
            <div className="price">${item.price}</div>
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <button className="btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
