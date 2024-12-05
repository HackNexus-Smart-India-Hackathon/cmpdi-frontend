import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { setLogin } from '../../state';
import 'react-toastify/dist/ReactToastify.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/lock.png';
import moc_img from '../Assets/moc.png';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user_id, access_token, role ,chat } = useSelector((state) => state.auth);
  console.log(user_id, access_token, role);

  const baseUrl = process.env.REACT_APP_AUTH_BASE_API;
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const user_id = response.data.user.id;
        const access_token = response.data.token;
        const { role } = response.data.user;
        const chat = response.data.chat
        dispatch(setLogin({ user_id, access_token, role,chat }));

        console.log('Dispatched setLogin:', { user_id, access_token, role,chat });
        console.log('Updated state:', { user_id, access_token, role ,chat});

        toast.success('Login successful!');
        window.location.href = `/${role}Console`;
      }
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleSubmit = () => {
    handleLogin(email, password);
  };

  return (
    <div className="my-6 m-auto p-5 md:w-9/12 w-11/12 bg-white flex flex-col md:flex-row items-center justify-center shadow-2xl rounded-3xl">
      <div className="w-2/5 md:w-1/2">
        <img src={moc_img} alt="Ministry Of Coal" />
      </div>
      <div className="md:w-1 md:h-[80vh] h-1 bg-gray-300 mx-5"></div>
      <div className="m-20 p-5 md:h-3/5 md:w-1/2 w-11/12 bg-white flex flex-col items-center max-w-xl shadow-2xl rounded-3xl">
        <div className="text-4xl font-semibold">Login</div>
        <div className="mt-10 flex flex-col">
          <div className="flex items-center m-auto w-11/12 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
            <img
              src={email_icon}
              alt="Email Icon"
              className="w-1/12 md:w-1/12 mx-3 md:mx-5 my-0"
            />
            <input
              type="email"
              placeholder="Email"
              className="h-12 w-4/5 bg-transparent border-none outline-none size-5 placeholder-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center m-auto w-11/12 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
            <img
              src={password_icon}
              alt="Password Icon"
              className="w-1/12 md:w-1/12 mx-3 md:mx-5 my-0"
            />
            <input
              type="password"
              placeholder="Password"
              className="h-12 w-4/5 bg-transparent border-none outline-none size-5 placeholder-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-7 text-black text-l">
          Lost Password? Click{' '}
          <Link to="/resetpassword" className="text-blue-900">
            <span>Here!</span>
          </Link>
        </div>
        <div className="text-black text-l">
          Don&apos;t have an Id? Sign Up{' '}
          <Link to="/signup" className="text-blue-900">
            <span>Here!</span>
          </Link>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 p-2 w-11/12 bg-black text-white rounded"
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginSignup;
