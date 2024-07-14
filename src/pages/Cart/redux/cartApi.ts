import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem } from './types';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchUserCart: builder.query<CartItem[], number>({
      query: (userId) => `cart/${userId}`,
    }),
  }),
});

export const { useFetchUserCartQuery } = cartApi;
