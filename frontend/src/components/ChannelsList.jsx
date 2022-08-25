import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

import Channel from "./Channel.jsx";
import { selectors } from "../slices/channelsSlice";

const ChannelsList = (props) => {
  const { showModal } = props;
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(
    (store) => store.channels.currentChannelId
  );

  return (
    <Nav fill variant="pills" className="d-flex flex-column px-2" as="ul">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          currentChannelId={currentChannelId}
          channelData={{ ...channel }}
          showModal={showModal}
        />
      ))}
    </Nav>
  );
};

export default ChannelsList;
