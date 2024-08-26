import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';
import qs from 'qs';

export const register = async ({ name, email, password }) => {
  try {
    console.log(name);

    const data = qs.stringify({
      name,
      email,
      password,
      confirmPassword: password,
    });

    const response = await axios.post(
      `${BACKEND_URL}/auth/register`,
      data, // Send the URL-encoded string
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the content type correctly
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
