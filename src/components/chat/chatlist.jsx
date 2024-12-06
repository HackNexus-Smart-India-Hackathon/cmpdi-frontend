import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Chatscreen from './chatscreen';
import SidebarChat from './sidebarchat';
// import { setChats } from '../../state';

const ChatSection = () => {
  const displaySectionRef = useRef(null);
  const chatButtonRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatGet, setIsChatGet] = useState(false);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const { user_id, chatUser } = useSelector((state) => state.auth);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);
  const openChat = (chat) => {
    setSelectedChat(chat);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setSelectedChat(null);
    setIsChatOpen(false);
  };

  useEffect(() => {
    if (user_id && chatUser) {
      const baseUrl = process.env.REACT_APP_AUTH_BASE_API;
      const getChat = async () => {
        try {
          const response = await axios.post(`${baseUrl}/chat/chats`, {
            user_id: chatUser._id,
          });

          if (response.status === 200) {
            setIsChatGet(true);
            setChats(response.data.chat);
            dispatch(setChats(response.data.chat));
          }
        } catch (error) {
          console.error('Error retrieving chat data:', error);
          toast.error('Error retrieving chat. Please try again.');
        }
      };
      getChat();
    }
  }, [chatUser, dispatch, user_id]);

  const renderChat = () =>
    chats.map((chat) => (
      <SidebarChat
        key={chat._id}
        roomName={`Group: ${chat.projectId}`} // Using projectId to create a name
        lastMessage={`Members: ${chat.chat_members.length}`} // Display the number of members
        onClick={() => openChat(chat)} // Open the selected chat
      />
    ));

  const chatList = () => (
    <div className="ease-out transition-all duration-1000">
      {/* Search bar */}
      <div className="h-[7vh] flex items-center bg-white rounded-full px-2 mx-2 mb-4">
        <SearchIcon style={{ fontSize: '1.75em', color: '#2c2727e0' }} />
        <input
          className="h-[5vh] bg-none px-2 w-[84%] border-none outline-none"
          type="search"
          placeholder="Search chat"
          aria-label="Search"
        />
      </div>

      {/* Chat list */}
      <div className="bg-white h-[56vh] p-1 rounded-md overflow-auto">
        {isChatGet ? renderChat() : <p>Loading...</p>}
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        displaySectionRef.current &&
        !displaySectionRef.current.contains(event.target) &&
        chatButtonRef.current &&
        !chatButtonRef.current.contains(event.target)
      ) {
        closeChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displaySectionRef]);

  return (
    <div className="flex">
      {isChatOpen && (
        <div
          ref={displaySectionRef}
          className="z-30 ease-out transition-all duration-1000 bg-slate-200 p-4 rounded-md shadow-lg mt-2 fixed top-36 right-4 h-[70vh] w-fit overflow-y-auto "
        >
          {selectedChat ? (
            <Chatscreen
              roomName={selectedChat.chatType}
              closeChat={closeChat}
              chat_id={selectedChat._id}
            />
          ) : (
            chatList()
          )}
        </div>
      )}

      <CommentRoundedIcon
        ref={chatButtonRef}
        className="fixed bottom-5 right-5 cursor-pointer"
        onClick={toggleChat}
        fontSize="large"
      />
    </div>
  );
};

export default ChatSection;
