import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  user_id: null,
  access_token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user_id = action.payload.user_id;
      state.access_token = action.payload.access_token;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.user_id = null;
      state.access_token = null;
      state.role = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
