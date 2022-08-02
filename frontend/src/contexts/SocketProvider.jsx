import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { io } from "socket.io-client";

import SocketContext from './SocketContext';
import {addMessage} from '../slices/messagesSlice';
import {addChannel, removeChannel, setCurrentChannelId} from '../slices/channelsSlice'

const SocketProvider = ({children}) => {
  const socket = io();
  const dispatch = useDispatch();
  socket.on('newMessage', (data)=> {
    dispatch(addMessage(data));
  });
  socket.on('newChannel', (data)=> {
    dispatch(addChannel(data));
  });
  socket.on('removeChannel', (data)=> {
    dispatch(removeChannel(data));
  });
  const sendNewMessage = (bodyMessage) => {
    socket.emit('newMessage', bodyMessage);
  };
  const addNewChannel = (name, cb) => {
    socket.emit('newChannel', name, (response) => {
      const { status, data: { id } } = response;

      if (status === 'ok') {
        dispatch(setCurrentChannelId(id));
        if (cb) cb();
      }
    });
  };
  const removeChannel = (id, cb) => {
    socket.emit('removeChannel', {id:id}, (response) => {
      const { status } = response;

      if (status === 'ok') {
        //dispatch(setCurrentChannelId(id));
        if (cb) cb();
      }
    });
  };
  return (
    <SocketContext.Provider value={{ sendNewMessage, addNewChannel, removeChannel}}> 
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;