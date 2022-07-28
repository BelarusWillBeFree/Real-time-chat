import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { ChannelsList } from './ChannelsList';
import ModalWindow from './ModalWindow';

export const Channels = () => {
  const handleShowModalWindow = () => {

  }

  return(
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button
          variant="link"
          onClick={handleShowModalWindow}
          className="p-0 text-primary btn-group-vertical">
            <PlusSquare/>
        </Button>
      </div>  
      <ChannelsList />
    </div>
  )
}