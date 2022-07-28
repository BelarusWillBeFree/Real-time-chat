import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({username:'', token: ''});
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const selectors = loginAdapter.getSelectors((state) => ({username:state.login.username, token:state.login.token}));
export const { setUsername, setToken } = loginSlice.actions;
export default loginSlice.reducer;