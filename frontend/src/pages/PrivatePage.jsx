import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { useRollbar } from '@rollbar/react';
import { useNavigate } from 'react-router-dom';

import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import { getData } from '../api/dataExchange.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import useAuth from '../hooks/useAuth.jsx';
import router from '../routes';
import Modals from '../components/modals/Modals.jsx';

const PrivatePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const rollbar = useRollbar();

  useEffect(() => {
    if (!auth.loggedIn) {
      const {
        pages: { login },
      } = router;
      navigate(login);
    } else {
      const loginData = auth.getLogin();
      if (loginData) {
        auth.logIn();
      }
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
    }
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
