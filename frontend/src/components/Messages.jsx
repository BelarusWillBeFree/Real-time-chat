import { Col } from 'react-bootstrap';

import MessagesHeader from './MessagesHeader';
import MessagesBody from './MessagesBody';
import MessagesFooter from './MessagesFooter';

const Messages = () => {

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