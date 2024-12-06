// import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Attachment icon
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'; // Emoji icon
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // More options icon
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import SearchIcon from '@mui/icons-material/Search'; // Search icon

const Chatscreen = ({ roomName, closeChat } , chat_id) => {
  let baseUrl = process.env.REACT_APP_AUTH_BASE_API;
  let [message , setMessage] = useState('')
  let [prevMessages , setPrevMessage] = useState([])
  let [socket,setSocket] = useState(null)
  let {user} = useSelector(state=>{state.auth})
  useEffect(()=>{
    const getPrevMeessage = async()=>{
      try {
        let response = axios.post(`${baseUrl}/chat/getPrevChat` , {
          chat_id
        })
        if(response.status = 200){
          const messages =response.data
          setPrevMessage(prevMessages => [...prevMessages , messages])
        }  
      } catch (error) {
        console.error(error)
      }
    }
    getPrevMeessage()
    const ws = new WebSocket('ws://loclahost:8080')
    setSocket(ws)

    ws.onopen = ()=>{
      console.log("connected to websocket")
    }
    const msg = {
      type : "JOIN_ROOM" ,
      payload : {
        name : user.name , 
        userId : user._id ,
        roomId : chat_id
      }
    }
    ws.send(msg)
    ws.onmessage  = (e)=>{
      setPrevMessage(prevMessages => [...prevMessages , {
            chat_id : chat_id,
            content : e.data.payload.message,
            created_at : new Date.now(),
            creared_by : e.data.payload.name
      }])
    }
    ws.onclose = ()=>{
      console.log("closing connection")
    }
    ws.onerror = ()=>{
      console.log()
    }
  },[])
  const sendMessage = ()=>{
    const saveMessage =   ()=>{
      axios.post(`${baseUrl}/chat/message` ,{
        content : message,  
        chat_id,
        created_by : chat.name
      })
      .then(res => {
        if(res.status == 200)
          console.log("message saved successfully")
      })
      .catch(error => [
        console.error(error)
      ])
    }
    saveMessage()
    if(socket){
      const msg = {
        type : "SEND_MESSAGE",
        payload : {
          userId : user._id ,
          roomId : chat_id , 
          message : message
        }
      }
      socket.send(msg)
    }
  }
  const handleChange = (e)=>{
    setMessage(e.target.value);
  }
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
        <div className="flex-1 bg-beige-100 overflow-y-auto p-4">
          {
           useEffect(()=>{
            ()=>{
              prevMessages.forEach(msg => {
               return (<div>{ msg.conent}</div>)
              }) 
             }
           } , [prevMessages])
          }
        </div>

        {/* Footer */}
        <div className="flex items-center p-3 bg-white border-t border-gray-300">
          <InsertEmoticonIcon />
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 mx-3 p-2 bg-gray-100 rounded-full focus:outline-none"
            value={message}
            onChange={handleChange}
          />
          <button onClick={sendMessage}>submit</button>
          <MicIcon />
        </div>
      </div>
    </div>
  );
};

export default Chatscreen;
