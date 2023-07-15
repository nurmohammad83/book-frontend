import { useState, FormEvent } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  userEmail: string;
  thumbnail: string;
  publicationDate: Date;
  reviews?: string[];
}

const bookData: Book = {
  _id: "12345",
  title: "Sample Book",
  author: "John Doe",
  genre: "Fiction",
  userEmail: "user@example.com",
  thumbnail: "https://example.com/book-thumbnail.jpg",
  publicationDate: new Date("2023-07-15"),
  reviews: ["Great book!", "Highly recommended"],
};

const BookDetails = () => {
  const [reviews, setReviews] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviews((prevReviews) => [...prevReviews, reviewText]);
    setReviewText('');
  };

  const handleDeleteBook = () => {
    console.log('Book deleted');
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">{bookData.title}</h1>
        <p className="text-lg font-semibold mb-4">{bookData.author}</p>
        <p className="text-lg mb-4">{bookData.genre}</p>
        <p className="text-lg mb-4">{bookData.publicationDate.toDateString()}</p>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-2">
                {review}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <button
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => console.log('Edit book clicked')}
          >
            <AiOutlineEdit className="mr-2" /> Edit Book
          </button>
          <button
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDeleteBook}
          >
            <AiOutlineDelete className="mr-2" /> Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
