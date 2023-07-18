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
      query: (id) => `/books/review/${id}`,
      providesTags: ["Reviews"],
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
        url: `/books/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    addToWishList: builder.mutation({
      query: (data) => ({
        url: "/users/add-wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishList: builder.query({
      query: () => "/users/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToReading: builder.mutation({
      query: (data) => ({
        url: "/users/add-readinglist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reading"],
    }),
    getReading: builder.query({
      query: () => "/users/readinglist",
      providesTags: ["Reading"],
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
  useAddToWishListMutation,
  useGetWishListQuery,
  useGetReadingQuery,
  useAddToReadingMutation,
} = bookApi;
