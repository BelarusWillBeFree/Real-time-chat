import {
  createSlice,
  createEntityAdapter,
  nanoid,
} from '@reduxjs/toolkit';
import {removeChannel} from './channelsSlice'
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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
  //    const deletedIdChannel = action.payload;
   //   console.log(`remove channel ${deletedIdChannel}. Need to remove all message this channel`);
    });
  }
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;