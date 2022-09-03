import { useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { getMessagesForCurrentChannel } from '../selectors.js';

const Message = ({ username, body }) => {
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {body}
    </div>
  );
}

const MessagesBody = () => {
  const divRef = useRef();

  const messagesCurrentChannel = useSelector(getMessagesForCurrentChannel);

  useEffect(()=>{
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messagesCurrentChannel.length]);
  return (
    <div className="chat-messages overflow-auto px-5" ref={divRef}>
      {messagesCurrentChannel
        .map((message) => (
          <Message key={message.id} username={message.username} body={message.body} />
        ))}
    </div>
  );
}

export default MessagesBody;
