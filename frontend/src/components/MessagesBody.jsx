import { useSelector } from 'react-redux';

import { selectors } from '../slices/messagesSlice';
const Message = ({ username, body}) => {
  return (
    <div 
      className='text-break mb-2' 
      
    >
      <b>
        {username}
      </b> : {body}
    </div>
  );
}

const MessagesBody = () => {
  const messages = useSelector(selectors.selectAll);
  //console.log(messages);
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  // отобрать сообщения текущего канала
  return (
    <div className='chat-messages overflow-auto px-5 '>
      {
        messages
        .filter(el => el.channelId === currentChannelId)
        .map(
          (message) =>
            <Message
              key={ message.id }
              username={ message.username }
              body={ message.body }
            />
        )
      }
    </div>    
  );
}

export default MessagesBody;