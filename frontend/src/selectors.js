import { channelsSelector } from './slices/channelsSlice.js';
import { messagesSelector } from './slices/messagesSlice.js';

export const getChannels = channelsSelector.selectAll;
export const getMessages = messagesSelector.selectAll;
export const getModalInfo = (state) => state.modal;

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  const messages = messagesSelector.selectEntities(state);
  return Object.values(messages).filter((m) => m.channelId === currentChannelId);
};

export const getChannelsNames = (state) => {
  const channels = channelsSelector.selectEntities(state);
  return Object.values(channels).map(({ name }) => name);
};

export const getChannelById = (channelId) => (state) => 
  channelsSelector.selectById(state, channelId);

export const getCurrentChannel = (state) => {
  const channels = channelsSelector.selectEntities(state);
  const { currentChannelId } = state.channels;
  return Object.values(channels).find(({ id }) => currentChannelId === id);
};
