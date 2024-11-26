import React from 'react';

import email_icon from '../Assets/email.png';
import password_icon from '../Assets/lock.png';
import user_icon from '../Assets/user.png';

const LoginSignup = () => {

  const [action, setAction] = React.useState("Sign Up");
  return (
    <div className=" m-auto my-9 pb-5 bg-white flex flex-col max-w-xl">
      <div className="flex flex-col items-center gap-2 w-full mt-7 ">
        <div className="text-purple-950 text-5xl font-bold">{action}</div>
        <div className="w-16 h-2 bg-purple-950 rounded-lg"></div>
      </div>
      <div className="mt-14 flex flex-col gap-6">
        {action === "Login" ? <div></div> :
          <div className="flex items-center m-auto w-96 h-20 bg-slate-200 rounded-md">
          <img src={user_icon} alt="User Icon" className="h-6 w-6 mx-7 my-0" />
          <input type="text" placeholder="Username" className="h-12 w-96 bg-transparent border-none outline-none size-5 bg-slate-200" />
        </div> }
        
        <div className="flex items-center m-auto w-96 h-20 bg-slate-200 rounded-md">
          <img src={email_icon} alt="Email Icon" className="h-6 w-6 mx-7 my-0" />
          <input type="email" placeholder="Email" className="h-12 w-96 bg-transparent border-none outline-none size-5 bg-slate-200" />
        </div>
        <div className="flex items-center m-auto w-96 h-20 bg-slate-200 rounded-md">
          <img src={password_icon} alt="Password Icon" className="h-6 w-6 mx-7 my-0"/>
          <input type="password" placeholder="Password" className="h-12 w-96 bg-transparent border-none outline-none size-5 bg-slate-200" />
        </div>
      </div>
      {action === "Sign Up" ? <div></div> :<div className="pl-16 mt-7 text-slate-500 text-xl">Lost Password? <span className="text-violet-950 cursor-pointer">Click Here!</span></div>}
      <div className="flex gap-7 my-14 mx-auto">
        <div onClick = {()=>{setAction("Sign Up")}} className={ action=== "Login" ? "bg-slate-300 flex justify-center items-center w-56 h-14 text-white rounded-[30px] text-xl text-bold cursor-pointer" : "flex justify-center items-center w-56 h-14 text-white bg-violet-950 rounded-[30px] text-xl text-bold cursor-pointer"}>Sign Up</div>
        <div onClick = {()=>{setAction("Login")}} className={action=== "Sign Up"?"bg-slate-300 flex justify-center items-center w-56 h-14 text-white rounded-[30px] text-xl text-bold cursor-pointer" : "flex justify-center items-center w-56 h-14 text-white bg-violet-950 rounded-[30px] text-xl text-bold cursor-pointer"}>Log In</div>
      </div>
    </div>
  );
};

export default LoginSignup;
