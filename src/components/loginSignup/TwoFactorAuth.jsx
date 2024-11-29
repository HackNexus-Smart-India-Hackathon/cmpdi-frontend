import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import callRefreshToken from '../../utils/reset_token';
import moc_img from '../Assets/moc.png';
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from './OtpInput';

const TwoFactorAuth = () => {
  const { user_id, access_token } = useSelector((state) => state.auth);
  console.log(access_token, user_id);

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [twoFaPin, setTwoFaPin] = useState('');

  console.log('Secret:', secret);
  const baseUrl = process.env.REACT_APP_AUTH_BASE_API;

  const onOtpSubmit = (otp) => { 
    setTwoFaPin(otp);
  }
  
  const handle2FAPinSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/verify-2fa/${user_id}`,
        { token: twoFaPin },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log('2FA verification successful:', response.data);
        window.location.href = '/adminconsole';
      }
    } catch (error) {
      console.error('Error verifying 2FA PIN:', error);
      // Handle error (e.g., show error message)
    }
  };

  useEffect(() => {
    const generate2FASecret = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/auth/generate-secret/${user_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            withCredentials: true,
          }
        );
        const { data_url, secret } = response.data;

        setQrCodeUrl(data_url);
        setSecret(secret);
        toast.success('2FA secret generated successfully!');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, refresh the token
          try {
            const newAccessToken = await callRefreshToken();
            // Retry the original request with the new token
            const retryResponse = await axios.post(
              `${baseUrl}/auth/generate-secret/${user_id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
                withCredentials: true,
              }
            );
            const { data_url, secret } = retryResponse.data;

            setQrCodeUrl(data_url);
            setSecret(secret);
            toast.success(
              '2FA secret generated successfully after token refresh!'
            );
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            toast.error('Error refreshing token. Please try again.');
          }
        } else {
          console.error('Error generating 2FA secret:', error);
          toast.error('Error generating 2FA secret. Please try again.');
        }
      }
    };

    generate2FASecret();
  }, [access_token, baseUrl, user_id]);
  return (
    <div className="my-6 m-auto p-5 md:w-9/12 w-11/12 bg-white flex flex-col md:flex-row items-center justify-center  shadow-2xl rounded-3xl ">
      <div className="w-2/5 md:w-1/2">
        <img src={moc_img} alt="Ministry Of Coal" />
      </div>
      <div className="md:w-1 md:h-[80vh] h-1 bg-gray-300 mx-5"></div>
      <div className="m-20 p-5 md:h-3/5 md:w-1/2 w-11/12 bg-white flex flex-col items-center max-w-xl shadow-2xl rounded-3xl">
        <div className="text-4xl font-semibold">Two-Factor Authentication</div>
        <div className="mt-10 flex flex-col">
          To be able to authorize your account, please scan the QR code below
          using your Google Authenticator app and enter the vertification code
          below.
          <div className="flex items-center m-auto w-11/12 h-15 bg-white outline-black outline-1 outline rounded-md mt-2 ">
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="Generating QR code"
                className="w-11/12 md:w-11/12 mx-3 md:mx-5 my-0"
              />
            )}
          </div>
        </div>
        <div>Verification code</div>
        <div className=" mt-7 text-black text-l">
          <Link to="/resetpassword" className="text-blue-900">
            <span>Do you need help?</span>
          </Link>
        </div>
        <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
        <button
          onClick={handle2FAPinSubmit}
          className="mt-4 p-2 bg-black text-white rounded w-11/12 h-10 "> Verify 2FA PIN</button>
        {secret && <p id="secret">Your 2FA secret: {secret}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TwoFactorAuth;
