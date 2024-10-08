import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, deleteProduct, editProduct } from '../../features/product/productSlice';
import AdminHeader from './AdminHeader';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    stock: 0,
    category: '',
    productImage: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility

  useEffect(() => {
    dispatch(fetchProducts({ search: '', category: '' }));
  }, [dispatch]);

  const handleAddProduct = (e) => {
    e.preventDefault();
  
    const productData = {
      ...newProduct,
      productImage: imageFile // Attach the image file
    };
  
    if (editMode) {
      dispatch(editProduct({ productId: currentProductId, updatedData: productData }))
        .then(() => {
          dispatch(fetchProducts()); // Re-fetch products after updating
        });
    } else {
      dispatch(createProduct(productData))
        .then(() => {
          dispatch(fetchProducts()); // Re-fetch products after creating
        });
    }
  
    resetForm();
    setIsPopupOpen(false); // Close popup after form submission
  };
  
  

  const handleEditClick = (product) => {
    setNewProduct(product);
    setCurrentProductId(product._id);
    setEditMode(true);
    setIsPopupOpen(true); // Open popup for editing
  };

  const resetForm = () => {
    setNewProduct({ name: '', price: 0, description: '', stock: 0, category: '', productImage: '' });
    setImageFile(null);
    setEditMode(false);
    setCurrentProductId(null);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      dispatch(fetchProducts()); // Re-fetch products after deletion
    });
  };

  return (
   <div>
    <AdminHeader/>
    <div className="min-h-screen p-8 bg-gray-100 pt-[7em]">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Product Management</h1>

      <button
        onClick={() => setIsPopupOpen(true)} // Open popup to add a new product
        className="bg-green-600 text-white py-2 px-4 rounded-lg mb-6 text-[16px]"
      >
        Add New Product
      </button>

      {/* Popup for Add/Edit Product */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[80vw] sm:w-[48vw] lg:w-[40em]  bg-white p-8 rounded-lg shadow-lg space-y-4 w-1/3">
            <h2 className="text-[20px] font-bold text-center text-green-600">{editMode ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleAddProduct} className="space-y-1">
              <label htmlFor="product_name" className='text-[12px] font-bold'>Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg product_name"
              />
              <br />
              <br />
              <label htmlFor="price" className='text-[12px] font-bold'>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg price"
              />
              <br />
              <br />
              <label htmlFor="text_area" className='text-[12px] font-bold'>Description</label>
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-area"
              />
              <br />
              <br />
              <label htmlFor="stock" className='text-[12px] font-bold'>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg stock"
              />
              <br />
              <br />
              <label htmlFor="category" className='text-[12px] font-bold'>Category</label>
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg category"
              />
              <br />
              <br />
              <label htmlFor="image" className='text-[12px] font-bold'>Product Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target?.files?.[0])}
                className="w-full border border-gray-300 rounded-lg p-2 image"
              />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                {editMode ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)} // Close popup on cancel
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="space-y-4 grid grid-cols-6 gap-4">
        {status === 'loading' && <p className="text-gray-500">Loading products...</p>}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
        {status === 'succeeded' &&
          products.map((product, idx) => (
            <div key={product._id || idx} className="bg-white p-6 rounded-lg shadow-lg">
              {product.productImage && (
                <img src={product.productImage} alt={product.name} className="mt-2 h-40  w-full object-cover" />
              )}
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Stock: {product.stock}</p>
              <p className="text-gray-700">Category: {product.category}</p>
              
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEditClick(product)}      
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
   </div>
  );
};

export default AddProduct;
