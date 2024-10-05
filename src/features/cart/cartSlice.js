import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  cart: JSON.parse(localStorage.getItem('tarek-ecom-cart')) || [], // Load cart from local storage
  status: 'idle',
  error: null,
};

// Async Thunk to add a product to the cart
export const addProductToCart = createAsyncThunk('cart/add', async (item) => {
  let cart = JSON.parse(localStorage.getItem('tarek-ecom-cart')) || [];
  
  const existingItemIndex = cart.findIndex(cartItem => cartItem.productId === item.productId);
  if (existingItemIndex !== -1) {
    // If the item exists, update the quantity
    cart[existingItemIndex].quantity += item.quantity; // Update quantity
  } else {
    // If it doesn't exist, push new item to cart
    cart.push(item);
  }
  
  // Save updated cart to local storage
  localStorage.setItem('tarek-ecom-cart', JSON.stringify(cart));
  return cart; // Return the updated cart
});

// Async Thunk to remove a product from the cart
export const removeProductFromCart = createAsyncThunk('cart/remove', async (productId) => {
  let cart = JSON.parse(localStorage.getItem('tarek-ecom-cart')) || [];
  cart = cart.filter(item => item.productId !== productId); // Remove item
  localStorage.setItem('tarek-ecom-cart', JSON.stringify(cart)); // Save updated cart
  return cart; // Return the updated cart
});

// Async Thunk to load the cart
export const loadCart = createAsyncThunk('cart/load', async () => {
  return JSON.parse(localStorage.getItem('tarek-ecom-cart')) || []; // Load cart from local storage
});

// Async Thunk to update the quantity of a product in the cart
export const updateProductQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }) => {
  let cart = JSON.parse(localStorage.getItem('tarek-ecom-cart')) || [];
  
  const existingItemIndex = cart.findIndex(cartItem => cartItem.productId === productId);
  if (existingItemIndex !== -1) {
    // Update the quantity if the item exists
    cart[existingItemIndex].quantity = quantity;
  }
  
  localStorage.setItem('tarek-ecom-cart', JSON.stringify(cart)); // Save updated cart
  return cart; // Return the updated cart
});

// Async Thunk to clear the cart
export const clearCart = createAsyncThunk('cart/clear', async () => {
  localStorage.removeItem('tarek-ecom-cart'); // Clear cart from local storage
  return []; // Return an empty array to reset the cart
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cart = action.payload; // Load the cart on startup
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart = action.payload; // Assume API returns updated cart
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.cart = action.payload; // Update the cart after removal
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.cart = action.payload; // Update the cart after quantity change
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = []; // Clear the cart in the state
      });
  },
});

export default cartSlice.reducer;
