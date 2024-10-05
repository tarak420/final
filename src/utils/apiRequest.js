import axios from 'axios';
import { BASE_URL } from './constants';

// Reusable API request function
const apiRequest = async (method, endpoint, data = null) => {
  const token = localStorage.getItem('tarek_ecom_token'); // Get the token from localStorage
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`, // Attach token
      'Content-Type': 'application/json', // Set Content-Type to application/json
    },
    data, 
  };

  try {
    const response = await axios(config);
    console.log(method, ' ', endpoint, ' ', data, ' resp: ', response);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default apiRequest;
