// import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Attachment icon
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'; // Emoji icon
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // More options icon
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import React from 'react';
// import SearchIcon from '@mui/icons-material/Search'; // Search icon

const Chatscreen = ({ roomName, closeChat }) => {
  //   const messages = [
  //     {
  //       _id: '1',
  //       name: 'Ellen',
  //       message: 'Hey! How are you?',
  //       timestamp: '40 seconds ago',
  //       recieved: false,
  //     },
  //     {
  //       _id: '2',
  //       name: 'Ellen',
  //       message: 'Hey! How are you?',
  //       timestamp: '40 seconds ago',
  //       recieved: true,
  //     },
  //   ];
  //   const displaySectionRef = useRef(null);
  return (
    <div>
      <div className="h-[65vh] bg-gray-100 shadow-lg rounded-md flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-white shadow-md">
          <div className="flex items-center">
            <IconButton color="inherit" size="small" className="m-0 p-0">
              <ArrowBackIosNewIcon onClick={closeChat} />
            </IconButton>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="font-semibold text-sm ml-4">Room name</h2>
              <p className="text-xs text-gray-500 ml-4">Last seen at...</p>
            </div>
          </div>
          <div className="flex ">
            <IconButton size="small" color="inherit" className="m-0 p-0">
              <SearchIcon />
            </IconButton>
            <IconButton size="small" color="inherit" className="m-0 p-0">
              <AttachFileIcon />
            </IconButton>
            <IconButton size="small" color="inherit" className="m-0 p-0">
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 bg-beige-100 overflow-y-auto p-4"></div>

        {/* Footer */}
        <div className="flex items-center p-3 bg-white border-t border-gray-300">
          <InsertEmoticonIcon />
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 mx-3 p-2 bg-gray-100 rounded-full focus:outline-none"
          />
          <MicIcon />
        </div>
      </div>
    </div>
  );
};

export default Chatscreen;
