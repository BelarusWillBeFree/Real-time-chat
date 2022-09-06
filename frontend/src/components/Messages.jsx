import { Col, Spinner } from 'react-bootstrap';
import React, { useContext } from 'react';

import { SpinerContext } from '../contexts/Context.jsx';

import MessagesHeader from './MessagesHeader.jsx';
import MessagesBody from './MessagesBody.jsx';
import MessagesFooter from './MessagesFooter.jsx';

const Messages = () => {
  const { showSpiner } = useContext(SpinerContext);
  return (
    <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
          {
            showSpiner ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div> )
             : null
          }
        <MessagesBody />
        <MessagesFooter />
      </div>
    </Col>
  );
};

export default Messages;
