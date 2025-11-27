import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.freeapi.app/api/v1/public/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => `randomusers?page=${page}&limit=15`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
