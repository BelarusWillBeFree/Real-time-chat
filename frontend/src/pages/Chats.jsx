import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";

import { useRollbar } from "@rollbar/react";
import { useNavigate } from "react-router-dom";
import { addChannels } from "../slices/channelsSlice";
import { addMessages } from "../slices/messagesSlice";
import { setUsername, setToken } from "../slices/loginSlice";
import fetchData from "../api/fetchData";
import Channels from "../components/Channels.jsx";
import Messages from "../components/Messages.jsx";
import useAuth from "../hooks/useAuth.jsx";
import router from "../routes";
import { localStorGet } from "../hooks/useLocalStor.jsx";

const Chats = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const rollbar = useRollbar();

  const loginData = localStorGet();
  useEffect(() => {
    if (loginData) {
      dispatch(setUsername(loginData.username));
      dispatch(setToken(loginData.token));
      auth.logIn();
    }
    if (!auth.loggedIn) {
      const {
        pages: { login },
      } = router;
      navigate(login);
    }
  }, [loginData]);

  const { token } = useSelector((store) => store.login);

  useEffect(() => {
    fetchData(token)
      .then((response) => {
        if (!response) {
          return;
        }
        const { data } = response;
        dispatch(addChannels(data.channels));
        dispatch(addMessages(data.messages));
      })
      .catch((err) => {
        rollbar.error("get data from server", err);
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
};

export default Chats;
