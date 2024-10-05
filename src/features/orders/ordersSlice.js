import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/getToken';
import { BASE_URL } from '../../utils/constants';

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (userId) => {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/orders/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Add token in the Authorization header
            'Content-Type': 'application/json' // Ensure JSON content-type
        }
    });
    return response.data.orders; // Return the orders from the response
});


// Async thunk for fetching order details
export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderId) => {
  const token = getToken();
  console.log("orderid from slice",orderId)
  const response = await axios.get(`${BASE_URL}/orders/order/${orderId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in the Authorization header
        'Content-Type': 'application/json' // Ensure JSON content-type
    }
    }
  ); // Adjust this URL according to your API

  console.log(response)
  return response.data;
});


// Async thunk to create an order
export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
        headers: {
            'Authorization': `Bearer ${token}`, // Add token in the Authorization header
            'Content-Type': 'application/json' // Ensure JSON content-type
        }
    });
    console.log(response?.data)
    return response.data; // Return the created order
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: {}, 
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Set the fetched orders
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture any errors
            })
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload); // Add the newly created order to the orders array
            })
            .addCase(fetchOrderDetails.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.order = action.payload; // Set the fetched order details
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture any errors
            });
    },
});

export const selectOrder = (state) => state.orders.order; 


export default ordersSlice.reducer;
