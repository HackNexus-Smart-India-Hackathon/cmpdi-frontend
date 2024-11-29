import React from 'react';
import { Link } from 'react-router-dom';

import fa_icon from '../Assets/2fa.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/lock.png';
import moc_img from '../Assets/moc.png';
import phone_icon from '../Assets/phone.png';
import role_icon from '../Assets/role.png';
import user_icon from '../Assets/user.png';

const LoginSignup = () => {
  return (
    <div className="my-6 m-auto p-5 md:w-9/12 w-11/12 bg-white flex flex-col md:flex-row items-center justify-center  shadow-2xl rounded-3xl">
      <div className="w-2/5 md:w-1/2">
        <img src={moc_img} alt="Ministry Of Coal" />
      </div>
      <div className="md:w-1 md:h-[80vh] h-1 bg-gray-300 mx-5"></div>
      <div className="m-20 p-5 md:h-3/5 md:w-1/2 w-11/12 bg-white flex flex-col items-center max-w-xl shadow-2xl rounded-3xl">
        <div className="text-4xl font-semibold">Sign Up</div>
        <div className="mt-10 flex flex-col">
          <div className="flex flex-row gap-2">
            <div className="flex items-center m-auto w-1/2 h-15 bg-white outline-black outline-1 outline rounded-md mt-2 ">
              <img
                src={email_icon}
                alt="Email Icon"
                className="w-1/12 md:w-1/12 mx-3 md:mx-2 my-0"
              />
              <input
                type="email"
                placeholder="Email"
                className="h-12 w-4/5 bg-transparent border-none  outline-none size-5 placeholder-slate-500 "
              />
            </div>
            <div className="flex items-center m-auto w-1/2 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
              <img
                src={user_icon}
                alt="User Icon"
                className="w-1/12 md:w-1/12 mx-3 md:mx-2 my-0"
              />
              <input
                type="text"
                placeholder="Username"
                className="h-12 w-4/5 bg-transparent  border-none outline-none size-5 placeholder-slate-500"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex items-center m-auto w-1/2 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
              <img
                src={phone_icon}
                alt="Phone Icon"
                className="w-1/12 md:w-1/12 mx-3 md:mx-2 my-0"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="h-12 w-4/5 bg-transparent border-none  outline-none size-5 placeholder-slate-500"
              />
            </div>
            <div className="flex items-center m-auto w-1/2 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
              <img
                src={role_icon}
                alt="Role Icon"
                className="w-1/12 md:w-1/12 mx-3 md:mx-2 my-0"
              />
              <input
                type="dropdown"
                placeholder="Role"
                className="h-12 w-4/5 bg-transparent border-none outline-none size-5 placeholder-slate-500"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex items-center m-auto w-1/2 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
              <img
                src={password_icon}
                alt="Password Icon"
                className="w-1/12 md:w-1/12 mx-3 md:mx-2 my-0"
              />
              <input
                type="password"
                placeholder="Password"
                className="h-12 w-4/5 bg-transparent border-none  outline-none size-5 placeholder-slate-500"
              />
            </div>
            <div className="flex items-center m-auto w-1/2 h-15 bg-white outline-black outline-1 outline rounded-md mt-2">
              <img
                src={password_icon}
                alt="Password Icon"
                className="w-1/12 md:w-1/12 mx-3 md:mx-2 my-0"
              />
              <input
                type="Password"
                placeholder="Confirm Password"
                className="h-12 w-4/5 bg-transparent border-none  outline-none size-5 placeholder-slate-500"
              />
            </div>
          </div>
          <div className="flex items-center m-auto w-3/4 h-15 bg-white text-black outline-black outline-1 outline rounded-md mt-2">
            <img
              src={fa_icon}
              alt="Password Icon"
              className="w-1/12 md:w-1/12 mx-3 md:mx-6 my-0"
            />
            Enable 2-FA
            <input
              type="checkbox"
              className="m-3 h-6 w-6 bg-transparent border-none outline-none placeholder-black accent-black "
            />
          </div>
        </div>
        <div className=" mt-7 text-black text-l">
          Already have an Id? Login{' '}
          <Link to="/login" className="text-blue-900">
            <span>Here!</span>
          </Link>
        </div>
        <div className="flex justify-center items-center mt-2 md:w-2/5 w-4/5 h-10 text-white bg-black rounded-[30px] text-l cursor-pointer">
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
