import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { username, password, expiresInMins: 30 },
      }),
      transformResponse: async (response: LoginResponse) => {
        return response;
      },
    }),
    getUser: builder.query<User, string>({
      query: (token) => ({
        url: 'auth/me',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;
