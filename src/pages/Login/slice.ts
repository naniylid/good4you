import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { authApi, User } from './apiLogin';

interface AuthState {
  token: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  username: string;
  password: string;
  isValid: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  status: 'idle',
  error: null,
  username: '',
  password: '',
  isValid: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setValid(state, action: PayloadAction<boolean>) {
      state.isValid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.token = payload.token;
        state.user = payload.user;
        localStorage.setItem('token', payload.token);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message || 'Failed to login';
      });
  },
});

export const { logout, setUser, setToken, setUsername, setPassword, setValid } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUserId = (state: RootState) => state.auth?.user?.id;
export const selectUserName = (state: RootState) => state.auth?.user?.firstName;
export const selectUserLastName = (state: RootState) => state.auth.user?.lastName;

export default authSlice.reducer;
