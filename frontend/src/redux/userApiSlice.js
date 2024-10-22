import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    EdituserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useEdituserClrMutation,
} = userApiSlice;
