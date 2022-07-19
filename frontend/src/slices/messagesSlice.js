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
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;