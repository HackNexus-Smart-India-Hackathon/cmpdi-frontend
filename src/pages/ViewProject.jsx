import React from 'react';
import ChatList from '../components/chat/chatlist';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const Project = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ChatList />
    </div>
  );
};

export default Project;
