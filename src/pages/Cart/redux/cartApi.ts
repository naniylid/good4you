import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem } from './types';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    fetchUserCart: builder.query<CartItem[], number>({
      query: (userId) => `carts/${userId}`,
    }),
    updateCart: builder.mutation<CartItem[], { userId: number; products: CartItem[] }>({
      query: ({ userId, products }) => ({
        url: `carts/${userId}`,
        method: 'PUT',
        body: {
          merge: false,
          products,
        },
      }),
    }),
  }),
});

export const { useFetchUserCartQuery, useUpdateCartMutation } = cartApi;
