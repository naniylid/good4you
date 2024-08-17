import { configureStore } from '@reduxjs/toolkit';

import cartSlice from '../pages/Cart/redux/slice';
import authSlice from './slices/authSlice';
import { productsApi } from './services/products/products';
import { cartByUserIdApi } from './services/cartById/cartById';
import { authorizationApi } from './services/autorization/autorization';
import { searchProductsParamsSlice } from './slices/searchProduct/searchProductParamsSlice';
import cartByUserIdSlice from './slices/cartByUserIdSlice';
import { notificationErrorSlice } from './slices/notificationError';

export const store = configureStore({
  reducer: {
    cartSlice,

    [productsApi.reducerPath]: productsApi.reducer,
    [cartByUserIdApi.reducerPath]: cartByUserIdApi.reducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    searchProductsParams: searchProductsParamsSlice.reducer,
    cartByUserId: cartByUserIdSlice.reducer,
    auth: authSlice.reducer,
    error: notificationErrorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      cartByUserIdApi.middleware,
      authorizationApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
