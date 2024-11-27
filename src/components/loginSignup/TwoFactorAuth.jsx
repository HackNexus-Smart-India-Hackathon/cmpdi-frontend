import React from 'react';
import { Link } from 'react-router-dom';
import moc_img from '../Assets/moc.png';
import qr_img from '../Assets/qrcode.png';

const LoginSignup = () => {
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
            <img
              src={qr_img}
              alt="Generating QR code"
              className="w-11/12 md:w-11/12 mx-3 md:mx-5 my-0"
            />
          </div>
        </div>
        <div>Verification code</div>

        <div className=" mt-7 text-black text-l">
          <Link to="/resetpassword" className="text-blue-900">
            <span>Do you need help?</span>
          </Link>
        </div>
        <button className="flex justify-center items-center mt-2 md:w-2/5 w-4/5 h-10 text-white bg-black rounded-[30px] text-l cursor-pointer">
          Next
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
