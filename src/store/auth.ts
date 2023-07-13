// auth store
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
