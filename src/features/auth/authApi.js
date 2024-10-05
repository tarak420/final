import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

// Registration API call
export const registerUser = async (userData) => {
  console.log('register',userData)
  const response = await axios.post(`${BASE_URL}/users/register`, userData);
  

   console.log(response)
   return response.data.message;
};

// Login API call (previously defined)
export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/users/login`, credentials);
  console.log(response)
  
  // Store user and token in localStorage
  localStorage.setItem('tarek_ecom_user', JSON.stringify(response.data.user));

  localStorage.setItem('tarek_ecom_token', response.data.token);
  return response.data;
};
