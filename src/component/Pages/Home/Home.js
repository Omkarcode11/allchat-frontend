import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import Menu from './../../Menu/Menu';
import Friends from './../../Friends/Friends';
import ChatBox from './../../ChatBox/ChatBox';
import { AppContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import AllChat from '../../AllChat/AllChat';

function Home() {
  const { user,show,user2 } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.authenticated) {
      navigate('/login');
    }
  }, [user, navigate ]);

  return (
    <div className="home-layout">
      <div className={"menu"} >
        <Menu  />
      </div>
      <div  className={'online-fr '} style={show?{zIndex:0}:{zIndex:10}}>
        <Friends />
      </div>
      <div className={"chat-box chatting "} style={show?{zIndex:50}:{zIndex:0}}>
        {
       user2.name.length>1 ?
       <ChatBox />:
       <AllChat/>
        }
      </div>
    </div>
  );
}

export default Home;
