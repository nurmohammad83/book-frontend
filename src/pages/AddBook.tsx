import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

interface AddBookProps {
  onBookAdd: (book: Book) => void;
}

interface Book {
  title: string;
  author: string;
  genre: string;
  userEmail: string;
  thumbnail: string;
  publicationDate: string;
}

const AddBook: React.FC<AddBookProps> = () => {
  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    userEmail: '',
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
    console.log(book)
    setBook({
      title: '',
      author: '',
      genre: '',
      userEmail: '',
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
            placeholder="Enter your email"
            value={book.userEmail}
            onChange={handleInputChange}/>
    <TextInput type="text"
            id="thumbnail"
            name="thumbnail"
            placeholder="Enter thumbnail URL"
            value={book.thumbnail}
            onChange={handleInputChange}/>

    <Button type='submit'>Add Book</Button>
    </form>
  </div>
</div>
  );
};

export default AddBook;
