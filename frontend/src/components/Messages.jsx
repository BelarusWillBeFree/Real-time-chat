import { Col } from 'react-bootstrap';

import MessagesHeader from './MessagesHeader';
import MessagesBody from './MessagesBody';
import MessagesFooter from './MessagesFooter';
//d-flex flex-column h-100   col border-end pt-5 px-0 bg-light col p-0 h-100
const Messages = () => {
  const channelName = '';
  const count = 0;
  return (
    <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <MessagesBody />
        <MessagesFooter />  
      </div> 
    </Col> 
  );
}

export default Messages;