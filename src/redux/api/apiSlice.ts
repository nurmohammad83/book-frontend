import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.accessToken;
      if (token) {
        headers.set("authorization", `${token.toString()}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Books", "Reviews", "Wishlist", "Reading"],
  endpoints: () => ({}),
});
