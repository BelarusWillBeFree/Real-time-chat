import { Form, Button, InputGroup } from "react-bootstrap";
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector, useEffect } from "react-redux";
import {useContext} from 'react';

import SocketContext  from "../contexts/SocketContext";
import AuthContext from '../contexts/AuthContext';

const MessagesFooter = () => {
  const initialValues = {message: ''};
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  const {sendNewMessage} = useContext(SocketContext);
  //const {username} = useContext(AuthContext);
  const username = useSelector((store) => store.login.username);

  const formik = useFormik({
    initialValues,
    onSubmit: ({message}, {resetForm}) => {
      const bodyMessage = {
        username,
        body: message,
        channelId: currentChannelId, 
      };
      sendNewMessage(bodyMessage);
      resetForm();
      //values.message = ''; mt-auto
    }
  });
  const {values, handleSubmit, handleChange} = formik;
  return (
    <div className='mt-auto px-5 py-3'>
      <Form onSubmit={handleSubmit} className='py-1 rounded-2 border'>
        <InputGroup className="">
          <Form.Control
            placeholder="Введите сообщение..."
            name='message'
            className='border-0'
            value={values.message}
            onChange={handleChange}
          />
          <Button type='submit' variant="link" disabled={ !values.message.length > 0 }>
          <ArrowRightSquare size={20} />
          </Button>
          
        </InputGroup>
      </Form>
    </div>    
  );
}

export default MessagesFooter;