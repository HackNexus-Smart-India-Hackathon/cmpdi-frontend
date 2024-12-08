import axios from 'axios';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
// import { setLogin } from '../../state';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/lock.png';
import moc_img from '../Assets/moc.png';
import phone_icon from '../Assets/phone.png';
import role_icon from '../Assets/role.png';
import user_icon from '../Assets/user.png';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.REACT_APP_AUTH_BASE_API;

// Validation schema using Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  username: yup.string().required('Username is required'),
  phone_number: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  role: yup.string().required('Role is required'),
});

const SignUp = () => {
  const { role, userId } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone_number: '',
    role,
  });

  const [errors, setErrors] = useState({});

  // Validate form data
  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const response = await axios.put(
        `${baseUrl}/auth/user/${userId}`,
        formData
      );
      if (response.status === 200) {
        toast.success('Sign up successful!');
        window.location.href = `/twofactorauthentication/${userId}`;
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="my-6 m-auto p-5 md:w-9/12 w-11/12 bg-white flex flex-col md:flex-row items-center justify-center shadow-2xl rounded-3xl">
      <div className="w-2/5 md:w-1/2">
        <img src={moc_img} alt="Ministry Of Coal" />
      </div>
      <div className="md:w-1 md:h-[80vh] h-1 bg-gray-300 mx-5"></div>
      <div className="m-20 p-5 md:h-3/5 md:w-4/5 w-11/12 bg-white flex flex-col items-center max-w-xl shadow-2xl rounded-3xl">
        <div className="text-4xl font-semibold">Sign Up</div>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col">
          {/* Username and Email */}
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={user_icon} alt="User" className="w-6 h-6 mx-2" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full p-2"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>

            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={email_icon} alt="Email" className="w-6 h-6 mx-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img
                  src={password_icon}
                  alt="Password"
                  className="w-6 h-6 mx-2"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-2"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img
                  src={password_icon}
                  alt="Confirm Password"
                  className="w-6 h-6 mx-2"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full p-2"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Phone and Role */}
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img
                  src={phone_icon}
                  alt="Phone Number"
                  className="w-6 h-6 mx-2"
                />
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2"
                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-xs">{errors.phone_number}</p>
              )}
            </div>
            <div className="flex flex-col items-center w-1/2">
              <div className="flex py-2 pl-2 pr-4 items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={role_icon} alt="Role" className="w-6 h-6 mx-2" />
                {role}
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs">{errors.role}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-black text-white rounded"
          >
            Sign Up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
