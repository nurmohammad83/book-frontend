/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import Book from "./Book";
import { IBook } from "../types";
import { useEffect, useState,ChangeEvent } from "react";
const Books = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchText, onSearch] = useState("");
  const { data: books } = useGetBooksQuery({searchText,selectedValue});
 
  const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  
  console.log(searchText);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  
  const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
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
            value={inputValue}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
          />
          <select
            value={selectedValue}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sort by</option>
            <option value="title ">Title </option>
            <option value="genre ">Genre </option>
            <option value="publicationDate">publicationDate</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t p-2  md:p-8">
        {books?.data?.data?.length >= 0
          ? books?.data?.data
              ?.map((book:IBook) => <Book key={book._id} book={book} />)
          : "Not Products found"}
        </div>
      </div>
    </div>
    </section>





  );
};

export default Books;
