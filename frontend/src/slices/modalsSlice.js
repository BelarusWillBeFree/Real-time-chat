import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

/* eslint  no-param-reassign: 0 */
const modalsAdapter = createEntityAdapter();

//const typeModals = [];

const initialState = modalsAdapter.getInitialState({
  type: 'adding',
  isShowed: false,
});

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setShowed: (state, { payload }) => {
      state.isShowed = payload;
    },
  },
});

export const modalsSelector = modalsAdapter.getSelectors((state) => state.modal);

export const {
  setType, setShowed,
} = modalsSlice.actions;

export default modalsSlice.reducer;
