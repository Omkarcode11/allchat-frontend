import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../../App';
import Msg from '../Msg/Msg';
import './Messages.css';


function Messages() {
  const scrollRef = useRef();
  const {chats,user}  = useContext(AppContext)
  console.log(chats)


  useEffect(()=>{

    scrollRef.current?.scrollIntoView({behavior:'smooth'})

  },[chats])



  return chats.length==0?<h1 className='no-cat'>No Massage Here type to Chat</h1>: (
    <div className="messages-chat-layout">
      {chats.map((item) => (
        <div ref={scrollRef}>
        <Msg own={item.sender === user.username ? true : false} text={item.text} createdAt={item.createdAt} />
        </div>
      ))}
    </div>
  );
}

export default Messages