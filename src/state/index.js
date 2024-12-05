import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  user_id: null,
  access_token: null,
  chat: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user_id = action.payload.user_id;
      state.access_token = action.payload.access_token;
      state.role = action.payload.role;
      state.chat = action.payload.chat;
    },
    setLogout: (state) => {
      state.user_id = null;
      state.access_token = null;
      state.role = null;
    },
  },
});

const chatInitialState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chat;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { setLogin, setLogout } = authSlice.actions;
export const { setChats } = chatSlice.actions;
export default authSlice.reducer;
