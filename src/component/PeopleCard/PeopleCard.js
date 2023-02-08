import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { URL } from '../Utils/BASE_URL';
import './PeopleCard.css';
import axios from 'axios';

function PeopleCard({ name, id, username, conversation }) {
  const { setConversation, user, setChats, setUser2 } = useContext(AppContext);
  
  async function conversationHandler() {
    setUser2({
      name : name,
      username : username,
    });
    console.log(name, username);
    let getConversationId = await axios.get(`${URL}/conversation/${user.username}/${username}`);

    setConversation(getConversationId.data[0]);
    let chats = await axios.get(`${URL}/message/get/${getConversationId.data[0].id}`);
    setChats(chats.data);
  }

  return (
    <div className="people-card-layout my-3" onClick={conversationHandler}>
      <div className="people-img">
        <div className="online-status"></div>
        <img src={`https://picsum.photos/50/5${id}`} alt="people img" className="people-avatar" />
      </div>
      <div className="people-card-body">
        <div className="user-name">
          {name[0]?.toUpperCase()}
          {name?.slice(1)}
        </div>
        <div className="last-msg">{username}</div>
      </div>
    </div>
  );
}

export default PeopleCard;
