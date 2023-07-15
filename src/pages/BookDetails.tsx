/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, FormEvent, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDeleteBookMutation, useSingleBookQuery } from '../redux/features/book/bookApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import { useAppSelector } from '../redux/hook';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const  {user} = useAppSelector (state=>state.user)
  const {bookId} = useParams()
  const {data:book} = useSingleBookQuery(bookId)
  const navigate  = useNavigate()
  const [deleteBook,{isError,isSuccess}] = useDeleteBookMutation();
  const [reviews, setReviews] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviews((prevReviews) => [...prevReviews, reviewText]);
    setReviewText('');
  };

  const handleDeleteBook =() => {
   if(book?.data?._id)deleteBook(book?.data?._id)
   toast.success('Delete Successfully')
  };

  useEffect(()=>{
    if(isSuccess){
      navigate('/')
    }
  },[isSuccess,navigate])
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
     
       {
        user.email === book?.data?.userEmail && <div className="flex justify-between items-center mt-4">
        <Link to={`/edit-book/${bookId}`}>
        <Button  color='success'> <AiOutlineEdit className="mr-2" /> Edit Book</Button>
        </Link>
          
         <button onClick={handleDeleteBook}>

         <Button  color='danger'> <AiOutlineDelete className="mr-2" /> Delete Book</Button>
         </button>
       </div>
       }
       {
        isError && <p className='text-center my-2 bg-red-500 text-white'>There is an error!</p>
       }
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
