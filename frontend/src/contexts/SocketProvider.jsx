import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { io } from "socket.io-client";

import SocketContext from './SocketContext';
import {addMessage} from '../slices/messagesSlice';
import { addChannel, removeChannel, setCurrentChannelId, renameChannel } from '../slices/channelsSlice';

const SocketProvider = ({children}) => {
  const socket = io();
  const dispatch = useDispatch();
  socket.on('newMessage', (data)=> {
    dispatch(addMessage(data));
  });
  socket.on('newChannel', (data)=> {
    dispatch(addChannel(data));
  });
  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data.id));
  });
  socket.on('renameChannel', (data) => {
    dispatch(renameChannel(data));
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
  const withTimeout = (onSuccess, onTimeout, timeout) => {
    let called = false;
  
    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      onTimeout();
    }, timeout);
  
    return (...args) => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      onSuccess.apply(this, args);
    }
  }

  const sendRemoveChannel = (id, cb) => {
    socket.emit('removeChannel', {id}, withTimeout(() => {
      cb("ok");
    }, () => {
      cb("timeout!");
    }, 3000));
  };

  const sendRenameChannel = (newProps, cb) => {
    socket.emit('renameChannel', newProps, withTimeout(() => {
      cb("ok");
    }, () => {
      cb("timeout!");
    }, 3000));
  };
  
  return (
    <SocketContext.Provider value={{ sendNewMessage, addNewChannel, sendRemoveChannel, sendRenameChannel}}> 
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;