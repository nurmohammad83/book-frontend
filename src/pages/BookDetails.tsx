/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, FormEvent } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useSingleBookQuery } from '../redux/features/book/bookApi';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import TextArea from '../components/TextArea';

const BookDetails = () => {
  const {bookId} = useParams()
  const {data:book} = useSingleBookQuery(bookId)

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
       <div className='flex justify-between items-center'>
         <div>
      <h1 className="text-2xl font-bold mb-4">{book?.data?.title}</h1>
        <p className="text-lg font-semibold mb-4">{book?.data?.author}</p>
        <p className="text-lg mb-4">{book?.data?.genre}</p>
        <p className="text-lg mb-4">{book?.data?.publicationDate}</p>
      </div>
        <img src={book?.data?.thumbnail} alt={book?.data?.title} className="w-64 h-auto mb-4" />
       </div>
     
        <div className="flex justify-between items-center mt-4">
         <Button color='success'> <AiOutlineEdit className="mr-2" /> Edit Book</Button>
           
          
          <Button onClick={()=>handleDeleteBook()} color='danger'> <AiOutlineDelete className="mr-2" /> Delete Book</Button>
           
        </div>
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <TextArea  placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}/>
          <Button  type='submit'> Submit Review</Button>
           
         
        </form>
        <h2 className="text-xl py-4 font-semibold mb-2">Reviews</h2>
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
      </div>
    </div>
  );
};

export default BookDetails;
