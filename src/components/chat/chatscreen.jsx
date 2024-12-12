import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Attachment icon
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'; // Emoji icon
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // More options icon
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Chatscreen = ({ roomName, closeChat, chat_id }) => {
  const baseUrl = process.env.REACT_APP_AUTH_BASE_API;
  const [message, setMessage] = useState('');
  const [prevMessages, setPrevMessages] = useState([]);
  console.log(prevMessages);

  const [socket, setSocket] = useState(null);
  const { chatUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPrevMessages = async () => {
      try {
        const response = await axios.post(`${baseUrl}/chat/getPrevChat`, {
          chat_id,
        });
        if (response.status === 200) {
          setPrevMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchPrevMessages();

    const ws = new WebSocket(`${process.env.REACT_APP_WS_BASE_API}`);
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      const msg = JSON.stringify({
        type: 'JOIN_ROOM',
        payload: {
          name: chatUser.name,
          userId: chatUser._id,
          roomId: chat_id,
        },
      });
      ws.send(msg);
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'NEW_MESSAGE') {
          setPrevMessages((prev) => [...prev, data.payload]);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      ws.close();
    };
  }, [baseUrl, chatUser._id, chatUser.name, chat_id]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const msgPayload = {
        content: message,
        chat_id,
        created_by: chatUser.name,
      };
      await axios.post(`${baseUrl}/chat/message`, msgPayload);
      if (socket) {
        const msg = JSON.stringify({
          type: 'SEND_MESSAGE',
          payload: {
            userId: chatUser._id,
            roomId: chat_id,
            message,
          },
        });
        socket.send(msg);
      }
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-[65vh] bg-gray-100 shadow-lg rounded-md flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white shadow-md">
        <div className="flex items-center">
          <IconButton color="inherit" size="small" onClick={closeChat}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="w-10 h-10 bg-gray-300 rounded-full ml-2"></div>
          <div className="ml-4">
            <h2 className="font-semibold text-sm">{roomName}</h2>
            <p className="text-xs text-gray-500">Last seen at...</p>
          </div>
        </div>
        <div className="flex">
          <IconButton size="small" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton size="small" color="inherit">
            <AttachFileIcon />
          </IconButton>
          <IconButton size="small" color="inherit">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
        {Array.isArray(prevMessages) ? (
          prevMessages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.created_by || 'Unknown'}:</strong> {msg.content}
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center p-3 bg-white border-t border-gray-300">
        <InsertEmoticonIcon />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 mx-3 p-2 bg-gray-100 rounded-full focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          Send
        </button>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chatscreen;
