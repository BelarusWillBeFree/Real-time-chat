import { useSelector } from 'react-redux';
import React from 'react';

import { selectors } from '../slices/messagesSlice';

const Message = ({ username, body }) => (
    <div
      className='text-break mb-2'
    >
      <b>
        {username}
      </b> : {body}
    </div>
);

const MessagesBody = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  return (
    <div className='chat-messages overflow-auto px-5 '>
      {
        messages
          .filter((el) => el.channelId === currentChannelId)
          .map(
            (message) => <Message
              key={ message.id }
              username={ message.username }
              body={ message.body }
            />,
          )
      }
    </div>
  );
};

export default MessagesBody;
