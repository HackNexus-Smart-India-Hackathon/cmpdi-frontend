import React from 'react';

import email_icon from '../Assets/email.png';
import moc_img from '../Assets/moc.png';

const LoginSignup = () => {
  return (
    <div className="my-10 m-auto p-5 md:w-9/12 w-11/12 bg-white flex flex-col md:flex-row items-center justify-center  shadow-2xl rounded-3xl">
      <div className="w-2/5 md:w-1/2">
        <img src={moc_img} alt="Ministry Of Coal" />
      </div>
      <div className="md:w-1 md:h-[80vh] h-1 bg-gray-300 mx-5"></div>
      <div className="m-20 p-5 md:h-3/5 md:w-1/2 w-11/12 bg-white flex flex-col items-center max-w-xl shadow-2xl rounded-3xl">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="text-4xl font-semibold">Forgot Password</div>
        </div>
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
              className="h-12 w-4/5 bg-transparent border-none  outline-none size-5 placeholder-slate-500"
            />
          </div>
        </div>
        <button
            type="submit"
            className="mt-4 p-2 w-11/12 bg-black text-white rounded"
          >
            Reset Password
          </button>
      </div>
    </div>
  );
};

export default LoginSignup;
