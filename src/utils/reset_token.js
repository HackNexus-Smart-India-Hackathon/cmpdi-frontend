import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_AUTH_BASE_API;

async function callRefreshToken() {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );

    console.log('Token refreshed successfully:', response.data);
    return response.data.access_token;
  } catch (error) {
    toast.error('Session expired. Please login again');
    throw error;
  }
}

export default callRefreshToken;
