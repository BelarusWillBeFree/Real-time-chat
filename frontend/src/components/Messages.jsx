import { Col } from "react-bootstrap";
import React from "react";

import MessagesHeader from "./MessagesHeader.jsx";
import MessagesBody from "./MessagesBody.jsx";
import MessagesFooter from "./MessagesFooter.jsx";

const Messages = () => (
  <Col className="h-100 p-0">
    <div className="d-flex flex-column h-100">
      <MessagesHeader />
      <MessagesBody />
      <MessagesFooter />
    </div>
  </Col>
);

export default Messages;
