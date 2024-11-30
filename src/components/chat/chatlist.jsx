import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import SearchIcon from '@mui/icons-material/Search';
// import { IconButton } from '@mui/material';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Chatscreen from './chatscreen';
import SidebarChat from './sidebarchat';

const ChatSection = () => {
  const displaySectionRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const toggleChat = useCallback(() => {
    setIsChatOpen(!isChatOpen);
  }, [isChatOpen]);

  const openChat = (chat) => {
    setSelectedChat(chat);
    setIsChatOpen(true);
  };
  const closeChat = () => {
    setSelectedChat(null);
    setIsChatOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        displaySectionRef.current &&
        !displaySectionRef.current.contains(event.target)
      ) {
        closeChat();
        toggleChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displaySectionRef, toggleChat]);

  const chatList = () => {
    return (
      <div className="ease-out transition-all duration-1000">
        {/* search bar */}
        <div className="ease-out transition-all duration-1000h-[7vh] flex items-center bg-white rounded-full px-2 mx-2 mb-4">
          <SearchIcon style={{ fontSize: '1.75em', color: '#2c2727e0' }} />
          <input
            className="h-[5vh] bg-none px-2 w-[84%] border-none outline-none"
            type="search"
            placeholder="Search chat"
            aria-label="Search"
          />
        </div>
        {/* chat list */}
        <div className="bg-white h-[56vh] p-1 rounded-md overflow-auto	">
          <SidebarChat
            roomName="Room 1"
            lastMessage="Hello there!"
            onClick={() => openChat({ roomName: 'Room 1' })}
          />
          <SidebarChat
            roomName="Room 2"
            lastMessage="How are you?"
            onClick={() => openChat({ roomName: 'Room 2' })}
          />
          <SidebarChat
            roomName="Room 3"
            lastMessage="Good morning!"
            onClick={() => openChat({ roomName: 'Room 3' })}
          />
          <SidebarChat
            roomName="Room 3"
            lastMessage="Good morning!"
            onClick={() => openChat({ roomName: 'Room 3' })}
          />
          <SidebarChat
            roomName="Room 3"
            lastMessage="Good morning!"
            onClick={() => openChat({ roomName: 'Room 3' })}
          />
          <SidebarChat
            roomName="Room 3"
            lastMessage="Good morning!"
            onClick={() => openChat({ roomName: 'Room 3' })}
          />
          <SidebarChat
            roomName="Room 3"
            lastMessage="Good morning!"
            onClick={() => openChat({ roomName: 'Room 3' })}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      {isChatOpen && (
        <div
          ref={displaySectionRef}
          className="ease-out transition-all duration-1000 bg-slate-200 p-4 rounded-md shadow-lg mt-2 fixed top-36 right-4 h-[70vh] w-fit overflow-y-auto "
        >
          {selectedChat ? (
            <Chatscreen
              roomName={selectedChat.roomName}
              closeChat={closeChat}
            />
          ) : (
            chatList()
          )}
        </div>
      )}

      <CommentRoundedIcon
        ref={displaySectionRef}
        className="fixed bottom-5 right-5 cursor-pointer"
        onClick={toggleChat}
        fontSize="large"
      />
    </div>
  );
};

export default ChatSection;
