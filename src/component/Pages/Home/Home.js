import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import Menu from './../../Menu/Menu';
import Friends from './../../Friends/Friends';
import ChatBox from './../../ChatBox/ChatBox';
import { AppContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.authenticated) {
      navigate('/login');
    }
  }, [user, navigate]);


  return (
    <div className="home-layout">
      <div className="menu">
        <Menu />
      </div>
      <div className="online-fr">
        <Friends />
      </div>
      <div className="chat-box">
        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
