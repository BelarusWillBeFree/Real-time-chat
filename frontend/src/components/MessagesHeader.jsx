import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import { selectors } from '../slices/channelsSlice';


const MessagesHeader = () => {
  //const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  //console.log('channels', channels);
  useEffect(() => {
    //console.log('channelCurrentId ', channelCurrentId);

  }, []);
  const channelName = 'current channel';
  const count = 0;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold"># { channelName }</p>
      <span className="text-muted">{ count } сообщений</span>
    </div> 
  );
}

export default MessagesHeader;