import { api } from "../../api/apiSlice";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "users/create-user",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApiSlice;
