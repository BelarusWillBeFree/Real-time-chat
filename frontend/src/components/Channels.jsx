import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { ChannelsList } from './ChannelsList';

export const Channels = () => {
  return(
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button variant="link" className="p-0 text-primary btn-group-vertical"><PlusSquare/></Button>
      </div>
      
      <ChannelsList />
    </Col>
  )
}