import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

type CatalogState = {
  limit: number;
};

const initialState: CatalogState = {
  limit: 12,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setLimit } = catalogSlice.actions;
export default catalogSlice.reducer;

export const selectLimit = (state: RootState) => state.catalogSlice;
