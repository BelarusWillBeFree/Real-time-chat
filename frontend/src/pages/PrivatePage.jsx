import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { useRollbar } from '@rollbar/react';

import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import { getData } from '../api/dataExchange.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Modals from '../components/modals/Modals.jsx';

const PrivatePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const rollbar = useRollbar();

  useEffect(() => {
    const loginData = auth.getLogin();
    getData(loginData.token)
      .then((response) => {
        if (!response) {
          return;
        }
        const { data } = response;
        dispatch(addChannels(data.channels));
        dispatch(addMessages(data.messages));
      })
      .catch((err) => {
        rollbar.error('get data from server', err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <Modals />
      </Row>
    </Container>
  );
};

export default PrivatePage;
