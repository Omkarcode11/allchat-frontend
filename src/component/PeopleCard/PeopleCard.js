import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { URL } from '../Utils/BASE_URL';
import './PeopleCard.css';
import axios from 'axios';

function PeopleCard({ name, id, username }) {
  const { setConversation, user, setChats, setUser2, setReceiverUser, onlineUsers ,setShow } = useContext(AppContext);
  const [liveUsers, setLiverUsers] = useState({});

  async function conversationHandler() {
    setShow(true)
    setUser2({
      name: name,
      username: username,
    });
    // console.log(name, username);
    let getConversationId = await axios.get(`${URL}/conversation/${user.username}/${username}`);

    setConversation(getConversationId.data[0]);
    let receiver = await axios.get(`${URL}/user/${username}`);
    setReceiverUser(receiver.data);

    let chats = await axios.get(`${URL}/message/get/${getConversationId.data[0].id}`);
    setChats(chats.data);
    
  }

  useEffect(() => {
    if (onlineUsers.length > 0) {
      for (let i = 0; i < onlineUsers.length; i++) {
        let newLiverUsers = liveUsers;
        newLiverUsers[onlineUsers[i].username] = onlineUsers[i].username;
        setLiverUsers(newLiverUsers);
      }
    }
  }, [onlineUsers,liveUsers]);

  return (
    <div className={user.username===username?'d-none':''}>

    <div className="people-card-layout my-3" onClick={conversationHandler} >
      <div className={'people-img'}>
        <div className={username === liveUsers[username] ? 'online-status' : 'd-none'}></div>
        <img src={`https://picsum.photos/50/5${id}`} alt="people img" className="people-avatar" />
      </div>
      <div className="people-card-body">
        <div className="user-name" onClick={()=>console.log('clicked')}>
          {name[0]?.toUpperCase()}
          {name?.slice(1)}
        </div>
        <div className="last-msg">{username}</div>
      </div>
    </div>
    </div>
  );
}

export default PeopleCard;
