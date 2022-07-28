import React, {
  useEffect,
} from "react";
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Container,
  Row,
} from 'react-bootstrap';

import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import { setUsername, setToken } from '../slices/loginSlice';
import fetchData from "../api/fetchData";
import { Channels } from '../components/Channels'
import Messages from "../components/Messages";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import router from '../routes';
import { localStorGet } from '../hooks/useLocalStor';

const Chats = (props) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const login = localStorGet();
  useEffect(() => {
    if (login) {
      dispatch(setUsername(login.username));
      dispatch(setToken(login.token));
      auth.logIn();
    }
    if (!auth.loggedIn) {
      const { pages: {login}} = router;
      navigate(login);
      return;
    }
  }, [login]);

  const token = useSelector((store) => store.login.token);

  useEffect(
    () => {

      fetchData(token).then((response) => {
        if (!response) {
          return;
        }
        const {data} = response;
        dispatch(addChannels(data.channels));
        dispatch(addMessages(data.messages));
      }).catch((err) =>{
        console.log(err);
      });
    }, []);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
      </Row>
    </Container>
  );
}

export default Chats;
