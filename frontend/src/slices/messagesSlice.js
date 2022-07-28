import {
  createSlice,
  createEntityAdapter,
  nanoid,
} from '@reduxjs/toolkit';

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
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;