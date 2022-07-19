import { useSelector } from 'react-redux';

import { selectors } from '../slices/messagesSlice';
const Message = ({key, username, text}) => {
  return (
    <div 
      className='text-break mb-2' 
      key={key}
    >
      <b>
        {username}
      </b> : {text}
    </div>
  );
}

const MessagesBody = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  // отобрать сообщения текущего канала
  return (
    <div className='chat-messages overflow-auto px-5 '>
      {
        messages.map(
          (message) =>
            <Message
              key={ message.id }
              username={ message.username }
              text={ message.text }
            />
        )
      }
    </div>    
  );
}

export default MessagesBody;