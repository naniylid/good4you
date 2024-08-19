import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../services/cartById/types';

interface InitialCart {
  cart: Cart | null;
}

const initialState: InitialCart = {
  cart: null,
};

export const cartByUserIdSlice = createSlice({
  name: 'cartByUserId',
  initialState,
  reducers: {
    getCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
    },
  },
});

export default cartByUserIdSlice.reducer;
