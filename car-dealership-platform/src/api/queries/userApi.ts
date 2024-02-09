import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from 'models/user';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({
        login: builder.mutation<{ user: User; message: string }, { username: string; password: string }>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = userApi;
