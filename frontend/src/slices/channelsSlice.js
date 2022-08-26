import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
/* eslint  no-param-reassign: 0 */
const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId
});
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannels: (state, { payload }) => {
      channelsAdapter.addMany(state, payload);
    },
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (payload === state.currentChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    renameChannel: (state, { payload }) => {
      channelsAdapter.setOne(state, payload);
    }
  }
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const { setCurrentChannelId, addChannels, addChannel, removeChannel, renameChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
