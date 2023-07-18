/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useGetWishListQuery } from "../redux/features/book/bookApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { IBook } from "../types";

const WishlistBook = () => {
  const { data:books, isLoading } = useGetWishListQuery(undefined);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t p-2  md:p-8">
          {isLoading &&   <LoadingSpinner />}
        {books?.data?.length >= 0
          ? books?.data
              ?.map((book:IBook) =>(
                <div
                className="flex  rounded-lg p-1 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  flex-row">
                <img
                  className="h-64 w-full rounded-t-lg object-cover  md:w-48 md:rounded-none md:rounded-l-lg"
                  src={book.thumbnail}
                  alt="" />
                <div className="flex w-full flex-col justify-between">
                <div className="flex flex-col justify-start p-6">
                    <span className="text-sm text-black opacity-50">{book.genre}</span>
                  <h5
                    className="mb-2 text-lg font-medium text-neutral-800 ">
                    {book.title}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 ">
                   Author: {book.author}
                  </p>
                  <p className="text-xs text-neutral-500 ">
                   {book.publicationDate}
                  </p>
                </div>
                <div className="flex justify-end space-x-3 p-4">
                  <Link  to={`/book/${book._id}`}>
                  <Button>See Details</Button>
                  
                  </Link>
                </div>
                </div>
              </div>
              ))
          : <p>No wishlist book here</p> }
        </div>
  );
};
export default WishlistBook;
