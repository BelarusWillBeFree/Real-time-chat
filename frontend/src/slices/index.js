import {configureStore} from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import loginReducer from './loginSlice';
export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    login: loginReducer,
  }
});