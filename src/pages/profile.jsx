import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import callRefreshToken from '../utils/reset_token';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user_id, access_token } = useSelector((state) => state.auth);

  const baseUrl = process.env.REACT_APP_AUTH_BASE_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          // withCredentials: true, // Include cookies in the request
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, refresh the token
          try {
            const newAccessToken = await callRefreshToken();
            // Retry the original request with the new token
            const retryResponse = await axios.get(
              `${baseUrl}/auth/user/${user_id}`,
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            setData(retryResponse.data);
            setLoading(false);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            setLoading(false);
          }
        } else {
          console.error('Error fetching profile data:', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [access_token, baseUrl, user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data ? (
        <div>
          <h1>Profile</h1>
          <p>Name: {data.username}</p>
          <p>Email: {data.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Profile;
