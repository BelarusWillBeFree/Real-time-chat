import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { SpinerContext } from '../contexts/Context.jsx';
import Channel from './Channel.jsx';
import { getChannels, getCurrentChannelId } from '../selectors.js';

const ChannelsList = () => {
  const channels = useSelector(getChannels);

  const currentChannelId = useSelector(getCurrentChannelId);
  const { setShowSpiner } = useContext(SpinerContext);
  setShowSpiner(channels.length === 0);
  return (
    <Nav fill variant="pills" className="d-flex flex-column px-2" as="ul">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          currentChannelId={currentChannelId}
          channelData={{ ...channel }}
        />
      ))}
    </Nav>
  );
};

export default ChannelsList;
