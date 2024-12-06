import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import SearchIcon from '@mui/icons-material/Search';
// import { IconButton } from '@mui/material';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Chatscreen from './chatscreen';
import SidebarChat from './sidebarchat';
import { useDispatch, useSelector } from 'react-redux';

const ChatSection = () => {
  const displaySectionRef = useRef(null);
  const chatButtonRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {chats} = useSelector(state => state.chats)
  const toggleChat = useCallback(() => {
    setIsChatOpen(!isChatOpen);
  }, [isChatOpen]);
  useEffect(()=>{
    const getChat = async ()=>{
      try {
        let response = await axios.post(`${baseUrl}/chat/chats` , {
          user_id : user._id
        })
        if(response.status === 200) {
          const chats = response.data.chat
          dispatch(setChats({chats}))
        }
      } catch (error) {
        console.log("error retrieving chat data")
        toast.error('Error retrieving chat. Please try again.');
      }
    }
    getChat();
  },[])
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
        !displaySectionRef.current.contains(event.target) &&
        chatButtonRef.current &&
        !chatButtonRef.current.contains(event.target)
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
        {()=>{
         if(!chats) {
          return (<div>no chats found</div>)
         }
         else{
          chats.forEach(chat=>{
            let roomName = "Project Group"
            if(chat.chat_members.length == 2){
              if(chat.chat_members[0].name == user.name)
                roomName = chat.chat_members[1]
              else  
              roomName = chat.chat_members[0]
            }
            return (
              <SidebarChat
                roomName={roomName}
              lastMessage="Good morning!"
              onClick={() => openChat({ roomName } , chat._id )}
            /> 
            )
          })
         }
          }}
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
        ref={chatButtonRef}
        className="fixed bottom-5 right-5 cursor-pointer"
        onClick={() => {
          if (isChatOpen) {
            closeChat();
            toggleChat();
          }
          else {
            toggleChat();
          }
        }}
        fontSize="large"
      />
    </div>
  );
};

export default ChatSection;
