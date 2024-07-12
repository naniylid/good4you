import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import apiSlice from './api/slice';
import cartSlice from '../pages/Cart/redux/slice';
import searchSlice from '../components/Search/slice';
import { cartApi } from '../pages/Cart/redux/cartApi';
import { productApi } from '../pages/Product/getProductApi';

export const store = configureStore({
  reducer: {
    apiSlice,
    cartSlice,
    searchSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, cartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
