// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { api } from "../../api/apiSlice";

// const userApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     createUser: builder.mutation({
//       query: (data) => ({
//         url: "/users/create-user",
//         method: "POST",
//         body: data,
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {},
//     }),
//     logInUser: builder.mutation({
//       query: (data) => ({
//         url: "/users/login",
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useCreateUserMutation, useLogInUserMutation } = userApi;
