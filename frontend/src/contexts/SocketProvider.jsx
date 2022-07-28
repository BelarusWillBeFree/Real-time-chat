import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { io } from "socket.io-client";

import SocketContext from './SocketContext'
import {addMessage} from '../slices/messagesSlice'

const SocketProvider = ({children}) => {
  const socket = io();
  const dispatch = useDispatch();
  socket.on('newMessage', (data)=> {
    //const dispatch = useDispatch();
    console.log('get new message', data);
    dispatch(addMessage(data));
  });
  const sendNewMessage = (bodyMessage) => {
    socket.emit('newMessage', bodyMessage);
  };
  return (
    <SocketContext.Provider value={{sendNewMessage}}> 
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;