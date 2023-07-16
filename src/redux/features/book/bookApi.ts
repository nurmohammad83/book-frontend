import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ searchText, selectedValue }) =>
        `/books/?searchTerm=${searchText}&sortBy=${selectedValue}`,
      providesTags: ["Books"],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    getReviews: builder.query({
      query: (id) => `/books/comment/${id}`,
      providesTags: ["Comments"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/books/create-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useDeleteBookMutation,
  useAddBookMutation,
  useEditBookMutation,
  useAddReviewMutation,
  useGetReviewsQuery,
} = bookApi;
