import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthorizationRequest, AuthorizationResponse } from './types';
import { getToken } from '../../../utils/index';

export const authorizationApi = createApi({
  reducerPath: 'authorizationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getUser: builder.mutation<AuthorizationResponse, AuthorizationRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    getUserByToken: builder.query<AuthorizationResponse, string>({
      query: () => ({
        url: 'auth/me',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const { useGetUserMutation, useGetUserByTokenQuery } = authorizationApi;
