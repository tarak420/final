import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authApi';

const initialState = {
  user: JSON.parse(localStorage.getItem('tarek_ecom_user')) || null,
  token: localStorage.getItem('tarek_ecom_token') || null,
  status: 'idle',
  error: null,
};

// Registration async thunk
export const register = createAsyncThunk('auth/register', async (userData) => {
  const message = await registerUser(userData);
  return message; // Returning only the message from registration
});

// Login async thunk
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginUser(credentials);
  return response; // Returning user and token from login
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear user and token from localStorage
      localStorage.removeItem('tarek_ecom_user');
      localStorage.removeItem('tarek_ecom_token');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Registration handling
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null; // Clear any previous error
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Login handling
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; // Save user info on successful login
        state.token = action.payload.token; // Save token on successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
