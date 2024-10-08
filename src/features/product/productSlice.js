import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsApi,
  fetchProductByIdApi,
  createProductApi,
  deleteProductApi,
  editProductApi,
} from './productApi';

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// Fetch products with search, category, and pagination from the backend
export const fetchProducts = createAsyncThunk(
  'products/load',
  async ({ search = '', category = '', page = 1, limit = 20 }) => {
    const response = await fetchProductsApi({ search, category, page, limit });
    console.log('from slice',response);
    return response; // Assuming the response contains products and pagination info
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk('products/fetchById', async (productId) => {
  const response = await fetchProductByIdApi(productId);
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
  return response;
});

// Delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (productId) => {
  await deleteProductApi(productId);
  return productId;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products; // Store fetched products
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        }; // Store pagination info
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
