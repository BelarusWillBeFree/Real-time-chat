import React, {
  useEffect
} from "react";
import {
  useDispatch,
} from 'react-redux';
import {
  Container,
  Row,
} from 'react-bootstrap';

import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import fetchData from "../api/fetchData";
import { Channels } from '../components/Channels'
import Messages from "../components/Messages";

const Chats = (props) => {
  const dispatch = useDispatch();
//  const channels = useSelector(selectors.selectAll); flex-column flex-md-row
  useEffect(
    () => {
      fetchData().then(({data}) => {
        console.log(data);
        dispatch(addChannels(data.channels));
        dispatch(addMessages(data.messages));
      }

      );
      //dispatch(fetchChannels());
    }, []);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="vh-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
}

export default Chats;
