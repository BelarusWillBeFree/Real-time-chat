import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  current,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from "../routes";

const channelsAdapter = createEntityAdapter();
/*
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const path = routes.dataPath();
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const {data} = await axios.get(path, headers);
      //return JSON.stringify(data);
      return data;
    } catch(err) {
      throw err;
    }
  }
);*/

const initialState = channelsAdapter.getInitialState({currentChannelId: 1});
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
  },

});
/*  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, {payload}) => {
      //console.log('channels', payload);
      channelsAdapter.addMany(state, payload.channels);
    });
  }*/
  
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const { setCurrentChannelId, addChannels } = channelsSlice.actions;
export default channelsSlice.reducer;