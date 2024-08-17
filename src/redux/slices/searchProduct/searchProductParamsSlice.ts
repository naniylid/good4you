import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GetSearchProductsParams } from './types';

const initialState: GetSearchProductsParams = {
  name: '',
  skip: 0,
  limit: 9,
};

export const searchProductsParamsSlice = createSlice({
  name: 'searchProductsParams',
  initialState,
  reducers: {
    changeSearchProductsParams(state, action: PayloadAction<GetSearchProductsParams>) {
      state.name = action.payload.name;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
    },
  },
});

export default searchProductsParamsSlice.reducer;
