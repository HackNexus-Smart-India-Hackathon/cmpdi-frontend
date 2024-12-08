import React from 'react';
import List from '../components/FormList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const FormsList = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>

        <div className="flex-1 m-4">
          <List />
        </div>
      </div>
    </div>
  );
};

export default FormsList;
