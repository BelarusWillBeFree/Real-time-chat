import { combineReducers } from '@reduxjs/toolkit';

import modalsReducer from './modalsSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modal: modalsReducer,
});
