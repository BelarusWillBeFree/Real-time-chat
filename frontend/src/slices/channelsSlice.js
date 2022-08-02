import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({currentChannelId: defaultChannelId});
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
      console.log('remove channel id:', payload)
     // channelsAdapter.removeOne(state, payload);
  //    state.currentChannelId = defaultChannelId;
    },

  },

});
  
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const { setCurrentChannelId, addChannels, addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;