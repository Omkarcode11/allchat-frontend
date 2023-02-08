import React, { useContext, useState } from 'react';
import './ChatFooter.css';
import axios from 'axios';
import { URL } from '../Utils/BASE_URL';
import { AppContext } from '../../App';

function ChatFooter() {
  const { conversation, user ,setChats } = useContext(AppContext);
  const [text, setText] = useState('');

  async function getLatestChats(){
     let chats = await axios.get(`${URL}/message/get/${conversation.id}`);
     setChats(chats.data);
  }

  async function addMessageHandler() {
    let require = {
      conversationId: conversation.id,
      sender: user.username,
      text: text,
    };
   let newChats =   await axios.post(`${URL}/message/add`,require);
   setText('')
   return getLatestChats()

  }

  return (
    <div>
      <div className="footer-layout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-emoji-heart-eyes-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z" />
        </svg>
        <input type={'text'} placeholder="Type here..." className="send-msg" value={text} onChange={(e) => setText(e.target.value)} />
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
