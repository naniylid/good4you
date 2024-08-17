import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../services/cartById/types';

interface initialCart {
  cart: Cart | null;
}

const initialState: initialCart = {
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
