import { configureStore } from '@reduxjs/toolkit';

import { productsApi } from './services/products/products';
import { cartByUserIdApi } from './services/cartById/cartById';
import { authorizationApi } from './services/autorization/autorization';
import { searchProductsParamsSlice } from './slices/searchProduct/searchProductParamsSlice';
import cartByUserIdReducer from './slices/cartByUserIdSlice';
import authReducer from './slices/authSlice';
import { notificationErrorSlice } from './slices/notificationError';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartByUserIdApi.reducerPath]: cartByUserIdApi.reducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    searchProductsParams: searchProductsParamsSlice.reducer,
    cartByUserId: cartByUserIdReducer,
    auth: authReducer,
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
