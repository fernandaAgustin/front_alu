import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    name: string;
    email: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ name: string; email: string; token: string }>) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
