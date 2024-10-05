import axios from 'axios';
import { getToken } from '../../utils/getToken';
import { BASE_URL } from '../../utils/constants';


// Add a product to the cart
export const addToCart = async (item) => {
  const token = getToken(); // Retrieve the token for authentication
 console.log(item)
  try {
    const response = await axios.post(`${BASE_URL}/users/cart`, item, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in the Authorization header
        'Content-Type': 'application/json' // Ensure JSON content-type
      }
    });
    console.log('api call: ',response.data)
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error; // Throw the error so the caller can handle it
  }
};


// Remove a product from the cart
export const removeFromCart = async (productId) => {
  const token = getToken();

  try {
    const response = await axios.delete(`${BASE_URL}/users/cart/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in the Authorization header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};


// Fetch the user's cart
export const fetchCart = async () => {
  const token = getToken();

  try {
    const response = await axios.get(`${BASE_URL}/users/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in the Authorization header
      }
    });
    console.log('fetch cart: ',response)
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};
