import {  useSelector } from 'react-redux';

import { selectors as selectorMessages } from '../slices/messagesSlice';
import { selectors as selectorChannels } from '../slices/channelsSlice';

const MessagesHeader = () => {
  const curChannelId = useSelector((store) => store.channels.currentChannelId);
  const currChannel = useSelector((state) => selectorChannels.selectById(state, curChannelId));
  const messages = useSelector(selectorMessages.selectEntities);
  const count = Object.values(messages).filter(message => message.channelId === curChannelId).length;

  const channelName = currChannel.name;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold"># { channelName }</p>
      <span className="text-muted">{ count } сообщений</span>
    </div> 
  );
}

export default MessagesHeader;