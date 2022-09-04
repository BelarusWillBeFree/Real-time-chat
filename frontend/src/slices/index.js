import { combineReducers } from '@reduxjs/toolkit';

import modalsReducer from './modalsSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import loginReducer from './loginSlice';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  login: loginReducer,
  modal: modalsReducer,
});
