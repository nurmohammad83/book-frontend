/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import Book from "./Book";
import { IBook } from "../types";
const Books = () => {
  const { data: books } = useGetBooksQuery(undefined);
  return (
    <section>
      <h1 className=" text-center font-poppins mb-6  text-2xl">
        All Books
      </h1>

      <div className="flex p-8 md:p-14">
      <div className=" w-full">
        <div className="flex justify-between flex-wrap gap-2 items-center m-5 ">
          <input
            type="text"
            placeholder="Search products..."
          
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
          />
          <select
           
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t p-2  md:p-8">
        {books?.data?.data?.length >= 0
          ? books?.data?.data
              ?.map((book:IBook) => <Book book={book} />)
          : "Not Products found"}
        </div>
      </div>
    </div>
    </section>





  );
};

export default Books;
