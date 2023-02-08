import React, { useRef } from 'react'
import './Msg.css'
import { format } from 'timeago.js';


function Msg({ own, text, createdAt }) {
  
  return (
    <div>
      <div className={own ? 'msg-layout own' : 'msg-layout'}>
        <div className={own ? 'msg-user bg-primary text-light' : 'msg-user '}>{text}</div>
        {/* <span>{format(createdAt)}</span> */}
      </div>
      <div className="time">{format(createdAt)}</div>
    </div>
  );
}

export default Msg