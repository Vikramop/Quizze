import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';

export const register = async ({ name, email, password }) => {
  try {
    console.log(name);

    const response = await axios.post(
      //  `${BACKEND_URL}/auth/register`,
      'http://localhost:5000/v1/auth/register',
      {
        name,
        email,
        password,
      },
      {
        headers: {
          contentType: 'www-form-urlencoded',
        },
      }
    );

    return response;
  } catch (error) {
    return new Error(error.response.data.message);
  }
};
