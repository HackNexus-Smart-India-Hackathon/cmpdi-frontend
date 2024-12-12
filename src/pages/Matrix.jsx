import React from 'react';
import { useSelector } from 'react-redux';
import QuarterlyExpenditure from '../components/charts/QuaterlyExpenditure';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Matrix = () => {
  const { user_id, access_token } = useSelector((state) => state.auth);
  console.log(user_id, access_token);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>

        <div className="flex-1 m-10">
          <QuarterlyExpenditure />
        </div>
      </div>
    </div>
  );
};

export default Matrix;
