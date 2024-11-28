import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const AdminConsole = () => {
  const { user_id, access_token } = useSelector((state) => state.auth);
  console.log(user_id, access_token);
  return (
    <div>
      <Navbar />
      <h1>Admin Console</h1>
      <Sidebar />
    </div>
  );
};

export default AdminConsole;
