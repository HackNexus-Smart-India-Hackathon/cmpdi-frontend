import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  user_id: null,
  access_token: null,
  chatUser: {},
};

const chatInitialState = {
  chats: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user_id = action.payload.user_id;
      state.access_token = action.payload.access_token;
      state.role = action.payload.role;
      state.chatUser = action.payload.chatUser;
    },
    setLogout: (state) => {
      state.user_id = null;
      state.access_token = null;
      state.role = null;
    },
  },
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
  },
});

export const chatReducer = chatSlice.reducer;

export const { setLogin, setLogout } = authSlice.actions;
export const { setChats } = chatSlice.actions;
export default authSlice.reducer;
