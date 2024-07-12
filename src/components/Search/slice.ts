import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface SearchSliceState {
  searchValue: string;
  value: string;
}

const initialState: SearchSliceState = {
  searchValue: '',
  value: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setSearchValue, setValue } = searchSlice.actions;
export const selectSearchSlice = (state: RootState) => state.searchSlice;

export default searchSlice.reducer;
