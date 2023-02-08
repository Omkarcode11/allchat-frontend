import React from 'react';
import ChatFooter from '../ChatFooter/ChatFooter';
import ChatHeader from '../ChatHeader/ChatHeader';
import Messages from '../Messages/Messages';
import './ChatBox.css';

function ChatBox() {
  return (
    <div className="chatBox-layout">
      <ChatHeader />
      <Messages />
      <ChatFooter />
    </div>
  );
}

export default ChatBox;
