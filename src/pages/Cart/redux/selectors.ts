import { RootState } from '../../../redux/store';

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartById = (id: number) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);
