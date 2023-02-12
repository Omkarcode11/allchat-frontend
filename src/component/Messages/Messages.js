import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../App';
import Msg from '../Msg/Msg';
import { io } from 'socket.io-client';
import {v4} from 'uuid'

function Messages() {
  const { chats, user, socket, conversation, setChats, setOnlineUsers } = useContext(AppContext);
  const scrollRef = useRef();
  const [arrivalMsg, setArrivalMsg] = useState(null);

  useEffect(() => {
    socket.current = io('ws://localhost:9000');
    socket.current.on('getMsg', (data) => {
      console.log(data);
      setArrivalMsg({
        conversationId: data.conversationId,
        sender: data.senderUsername,
        text: data.text,
        created: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    // if (arrivalMsg && String(conversation?.members).substring(arrivalMsg.sender)) {
    //   let newChats = chats.push(arrivalMsg);
    //   console.log(newChats)
    //   setChats(newChats);
    // }
    arrivalMsg &&
      String(conversation?.members).substring(arrivalMsg.sender) &&
      setChats((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg, conversation,setChats]);

  useEffect(() => {
    socket.current.emit('addUser', user.username);
    socket.current.on('getUsers', (users) => {
     setOnlineUsers(users)
    });
  }, [user,socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);
  console.log(chats);

  return chats.length === 0 ? (
    <h1 className="no-cat">No Massage Here type to Chat</h1>
  ) : (
    <div key={v4().slice(0,5)}  className="messages-chat-layout">
      {chats.map((item) => (
        <div ref={scrollRef}>
          <Msg own={item.sender === user.username ? true : false} text={item.text} createdAt={item.createdAt} />
        </div>
      ))}
    </div>
  );
}

export default Messages;
