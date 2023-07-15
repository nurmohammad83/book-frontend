/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useAppSelector } from '../redux/hook';
import { useAddBookMutation } from '../redux/features/book/bookApi';

interface Book {
  title: string;
  author: string;
  genre: string;
  userEmail: string | null ;
  thumbnail: string;
  publicationDate: string;
}

const AddBook: React.FC = () => {
  const {user} = useAppSelector(state=>state.user)

  const [addVideo, {  isError, isLoading, isSuccess }] = useAddBookMutation()

  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    userEmail:user.email,
    thumbnail: '',
    publicationDate: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addVideo(book)
    setBook({
      title: '',
      author: '',
      genre: '',
      userEmail: user.email,
      thumbnail: '',
      publicationDate: '',
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
      Add Your Book
    </h1>

    <form
      onSubmit={handleSubmit}
      className="mb-0 mt-4 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
    
    <TextInput 
          type="text"
          id='title'
           name="title"
           placeholder="Enter book title"
           value={book.title}
           onChange={handleInputChange}/>
    <TextInput type="text"
            id="author"
            name="author"
            placeholder="Enter author name"
            value={book.author}
            onChange={handleInputChange}/>
     <TextInput  type="text"
            id="genre"
            name="genre"
            placeholder="Enter book genre"
            value={book.genre}
            onChange={handleInputChange}/>
     <TextInput type="email"
            id="userEmail"
            name="userEmail"
            disabled
            placeholder="Enter your email"
            defaultValue={user.email!}
            />
    <TextInput type="text"
            id="thumbnail"
            name="thumbnail"
            
            placeholder="Enter thumbnail URL"
            value={book.thumbnail}
            onChange={handleInputChange}/>
    <TextInput type="date"

            id="publicationDate"
            name="publicationDate"
            
            placeholder="Enter publicationDate "
            value={book.publicationDate}
            onChange={handleInputChange}/>

    <Button type='submit'>Add Book</Button>
    </form>
             {isSuccess &&  <p className='bg-green-400 text-white'>Book was added successfully</p>}
               {isError &&   <p className='bg-red-400 text-white'>Book was an error</p>}
  </div>
</div>
  );
};

export default AddBook;
