import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartSliceState, CartItem } from './types';

const initialState: CartSliceState = {
  items: [],
  removedItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  discountedTotal: 0,
};

const calculateDiscountedTotal = (items: CartItem[]) => {
  return items.reduce(
    (total, item) => total + item.price * item.count * (1 - item.discountPercentage / 100),
    0,
  );
};

const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};

const calcTotalQuantity = (items: CartItem[]) => {
  return items.reduce((sum, item) => item.count + sum, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalQuantity = calcTotalQuantity(state.items);
      state.totalPrice = calcTotalPrice(state.items);
      state.discountedTotal = calculateDiscountedTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalQuantity = calcTotalQuantity(state.items);
      state.totalPrice = calcTotalPrice(state.items);
      state.discountedTotal = calculateDiscountedTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeProduct(state, action: PayloadAction<number>) {
      const removedItem = state.items.find((item) => item.id === action.payload);
      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.removedItems.push(removedItem);
      }
      state.totalQuantity = calcTotalQuantity(state.items);
      state.totalPrice = calcTotalPrice(state.items);
      state.discountedTotal = calculateDiscountedTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('removedItems', JSON.stringify(state.removedItems));
    },
    restoreProduct(state, action: PayloadAction<number>) {
      const restoredItem = state.removedItems.find((item) => item.id === action.payload);
      if (restoredItem) {
        state.removedItems = state.removedItems.filter((item) => item.id !== action.payload);
        state.items.push(restoredItem);
      }
      state.totalQuantity = calcTotalQuantity(state.items);
      state.totalPrice = calcTotalPrice(state.items);
      state.discountedTotal = calculateDiscountedTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('removedItems', JSON.stringify(state.removedItems));
    },
    setRemovedItems(state, action: PayloadAction<CartItem[]>) {
      state.removedItems = action.payload;
    },

    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.totalQuantity = calcTotalQuantity(action.payload);
      state.totalPrice = calcTotalPrice(action.payload);
      state.discountedTotal = calculateDiscountedTotal(action.payload);
    },
  },
});

export const {
  addProduct,
  minusItem,
  removeProduct,
  restoreProduct,
  setCartItems,
  setRemovedItems,
} = cartSlice.actions;
export default cartSlice.reducer;