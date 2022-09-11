import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

/* eslint  no-param-reassign: 0 */
const modalsAdapter = createEntityAdapter();

const initialState = modalsAdapter.getInitialState({
  type: 'adding',
  isShowed: false,
  idChannel: 1,
});

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.isShowed = true;
      state.type = payload.type;
      state.idChannel = payload.idChannel??state.idChannel;
    },
    closeModal: (state) => {
      state.isShowed = false;
    },
  },
});

export const modalsSelector = modalsAdapter.getSelectors((state) => state.modal);

export const {
  showModal, closeModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
