import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import React from 'react';

function SidebarChat({ roomName, lastMessage, onClick }) {
  return (
    <div
      className="flex items-center p-2 cursor-pointer bg-white m-2 rounded-md hover:bg-gray-200 transition duration-300"
      onClick={onClick}
    >
      <IconButton color="inherit">
        <AccountCircle style={{ fontSize: '2.5rem' }} />
      </IconButton>
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{roomName}</h2>
        <p className="text-sm text-gray-600">{lastMessage}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
