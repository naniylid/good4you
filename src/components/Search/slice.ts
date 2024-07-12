import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface SearchSliceState {
  searchValue: string;
}

const initialState: SearchSliceState = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export const selectSearchSlice = (state: RootState) => state.searchSlice;

export default searchSlice.reducer;
