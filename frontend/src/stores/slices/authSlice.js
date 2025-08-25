import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  roles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.roles = action.payload.roles || [];
      localStorage.setItem('token', state.token);
      localStorage.setItem('roles', JSON.stringify(state.roles));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.roles = [];
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;