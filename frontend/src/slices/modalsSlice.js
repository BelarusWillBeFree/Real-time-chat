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
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setShowed: (state, { payload }) => {
      state.isShowed = payload;
    },
    setIdChannel: (state, { payload }) => {
      state.idChannel = payload;
    },
    setModal: (state, { payload }) => {
      state.type = payload.type;
      state.isShowed = payload.isShowed;
      state.idChannel = payload.idChannel;
    }
  },
});

export const modalsSelector = modalsAdapter.getSelectors((state) => state.modal);

export const {
  setType, setShowed, setIdChannel, setModal, 
} = modalsSlice.actions;

export default modalsSlice.reducer;
