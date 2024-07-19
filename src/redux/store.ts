import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import apiSlice from './api/slice';
import catalogSlice from '../components/Catalog/slice';
import cartSlice from '../pages/Cart/redux/slice';
import searchSlice from '../components/atoms/Search/slice';
import { cartApi } from '../pages/Cart/redux/cartApi';
import { productApi } from '../pages/Product/getProductApi';
import authSlice from '../pages/Login/slice';
import { authApi } from '../pages/Login/apiLogin';

export const store = configureStore({
  reducer: {
    apiSlice,
    catalogSlice,
    cartSlice,
    searchSlice,
    auth: authSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, cartApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
