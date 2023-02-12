import React from 'react';
import './Msg.css';

function Msg({ own, text, createdAt }) {
  return (
    <div>
      <div className={own ? 'msg-layout own' : 'msg-layout'}>
        <div className={own ? 'msg-user bg-primary text-light' : 'msg-user '}>{text}</div>
        {/* <span>{format(createdAt)}</span> */}
      </div>
      <div className="time mb-4">{new Date(createdAt).toLocaleString()}</div>
    </div>
  );
}

export default Msg;
