import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authorizationApi } from '../services/autorization/autorization';

interface InitialAuth {
  id: number | null;
}

const initialState: InitialAuth = {
  id: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        authorizationApi.endpoints.getUser.matchFulfilled,
        authorizationApi.endpoints.getUserByToken.matchFulfilled,
      ),
      (state, { payload }) => {
        state.id = payload.id;
      },
    );
  },
});

export default authSlice.reducer;
