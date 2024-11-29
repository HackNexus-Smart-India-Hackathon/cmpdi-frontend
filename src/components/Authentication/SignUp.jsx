import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { setLogin } from '../../state';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/lock.png';
import moc_img from '../Assets/moc.png';
import phone_icon from '../Assets/phone.png';
import role_icon from '../Assets/role.png';
import user_icon from '../Assets/user.png';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.REACT_APP_AUTH_BASE_API;

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
  phone: yup.string().required('Phone number is required'),
  role: yup.string().required('Role is required'),
  twoFa: yup.boolean().oneOf([true], '2FA is required'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const { user_id, access_token, role } = useSelector((state) => state.auth);
  console.log(user_id, access_token, role);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      phone: '',
      role: 'admin',
      twoFa: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
        username: values.username,
        phone_number: values.phone,
        role: values.role,
        two_factor_enabled: values.twoFa,
      };

      try {
        const response = await axios.post(`${baseUrl}/auth/register`, data);

        if (response.status === 201) {
          toast.success('Sign up successful!');
          const user_id = response.data.user.id;
          const access_token = response.data.token;
          const { role } = response.data.user;
          dispatch(setLogin({ user_id, access_token, role }));
          window.location.href = `/twofactorauthentication`;
        }
      } catch (error) {
        console.error('Error signing up:', error);
        toast.error('Sign up failed. Please try again.');
      }
    },
  });

  return (
    <div className="my-6 m-auto p-5 md:w-9/12 w-11/12 bg-white flex flex-col md:flex-row items-center justify-center shadow-2xl rounded-3xl">
      <div className="w-2/5 md:w-1/2">
        <img src={moc_img} alt="Ministry Of Coal" />
      </div>
      <div className="md:w-1 md:h-[80vh] h-1 bg-gray-300 mx-5"></div>
      <div className="m-20 p-5 md:h-3/5 md:w-4/5 w-11/12 bg-white flex flex-col items-center max-w-xl shadow-2xl rounded-3xl">
        <div className="text-4xl font-semibold">Sign Up</div>
        <form onSubmit={formik.handleSubmit} className="mt-10 flex flex-col">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={user_icon} alt="User" className="w-6 h-6 mx-2" />
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Username"
                  className="w-full p-2"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs">{formik.errors.username}</p>
              )}
            </div>
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={email_icon} alt="Email" className="w-6 h-6 mx-2" />
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  className="w-full p-2"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>
          </div>
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  className="w-full p-2"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>
            <div className="flex flex-col items-center w-1/2 ">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img
                  src={password_icon}
                  alt="Confirm Password"
                  className="w-6 h-6 mx-2"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm Password"
                  className="w-full p-2"
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs ">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={phone_icon} alt="Phone" className="w-6 h-6 mx-2" />
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Phone"
                  className="w-full p-2"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
              )}
            </div>
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center m-auto h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
                <img src={role_icon} alt="Role" className="w-6 h-6 mx-2" />
                <select
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 bg-transparent border-none outline-none"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="investigator">Investigator</option>
                  {/* <option value="guest">Guest</option> */}
                </select>
              </div>
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-500 text-xs">{formik.errors.role}</p>
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
        <div className="mt-7 text-black text-l">
          Already have an Id? Login{' '}
          <Link to="/login" className="text-blue-900">
            <span>Here!</span>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
