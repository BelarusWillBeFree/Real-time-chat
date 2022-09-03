import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      messagesAdapter.addMany(state, payload);
    },
    addMessage: (state, { payload }) => {
      messagesAdapter.addOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restEntities = Object.values(state.entities).filter((e) => e.channelId !== payload);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);

export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
