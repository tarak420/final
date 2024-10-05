// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsApi,
  fetchProductByIdApi,
  createProductApi,
  deleteProductApi,
  editProductApi,
} from './productApi'; // Assuming these API functions exist

const initialState = {
  products: [],
  selectedProduct: null, // To hold the details of the selected product
  status: 'idle',
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk('products/load', async () => {
  const response = await fetchProductsApi();
  return response;
});

// Fetch product by ID
export const fetchProductById = createAsyncThunk('products/fetchById', async (productId) => {
  console.log("from slice:",productId)
  const response = await fetchProductByIdApi(productId);
  console.log(" resp frm slice ",response)
  return response;
});

// Add a new product
export const createProduct = createAsyncThunk('products/add', async (newProduct) => {
  const response = await createProductApi(newProduct);
  return response;
});

// Edit a product
export const editProduct = createAsyncThunk('products/edit', async ({ productId, updatedData }) => {
  const response = await editProductApi(productId, updatedData);
  return response; // Return the updated product
});

// Delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (productId) => {
  await deleteProductApi(productId);
  return productId; // Return productId to filter it out in the reducer
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // Set loading state
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded state
        state.products = action.payload; // Store fetched products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'; // Set failed state
        state.error = action.error.message; // Store error message
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'; // Set loading state for fetching product by ID
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded state
        state.selectedProduct = action.payload; // Store the fetched product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'; // Set failed state
        state.error = action.error.message; // Store error message
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Add new product
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update edited product
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload // Remove deleted product
        );
      });
  },
});

export default productSlice.reducer;
