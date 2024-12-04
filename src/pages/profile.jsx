import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserImage from '../components/Assets/userimg.png';
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
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const newAccessToken = await callRefreshToken();
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
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {data ? (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            {data.profile_image ? (
              <img
                src={data.profile_image}
                alt="User Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
              />
            ) : (
              <img
                src={UserImage}
                alt="Default User"
                className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
              />
            )}
            <h1 className="text-xl font-semibold text-gray-800">
              {data.username}
            </h1>
            <p className="text-gray-500 mb-4">{data.email}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default Profile;
