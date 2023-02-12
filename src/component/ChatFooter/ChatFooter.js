import React, { useContext, useState } from 'react';
import './ChatFooter.css';
import axios from 'axios';
import { URL } from '../Utils/BASE_URL';
import { AppContext } from '../../App';
import InputEmoji from 'react-input-emoji'


function ChatFooter() {
  const { conversation, user, setChats, socket, receiverUser } = useContext(AppContext);
  const [text, setText] = useState('');
  
  function handleOnEnter(text){
    console.log('enter' ,text)
  }

  async function getLatestChats() {
    let chats = await axios.get(`${URL}/message/get/${conversation.id}`);
    setChats(chats.data);
  }

  async function addMessageHandler() {
    let require = {
      conversationId: conversation.id,
      sender: user.username,
      text: text,
    };
    await axios.post(`${URL}/message/add`, require);
    setText('');
    getLatestChats();


    socket.current.emit('sendMsg', {
      conversationId: conversation.id,
      senderUsername: user.username,
      receiverUsername: receiverUser.username,
      text: text,
    });
  }

  // console.log(showPicker,text)

  return (
    <div>
      <div className="footer-layout">
        <InputEmoji
          placeholder="Type here..."
          className="send-msg"
          value={text}
          onChange={setText}
          cleanOnEnter 
          onEnter={handleOnEnter}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-send"
          onClick={addMessageHandler}
          viewBox="0 0 16 16"
        >
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
        </svg>
      </div>
    </div>
  );
}

export default ChatFooter;
