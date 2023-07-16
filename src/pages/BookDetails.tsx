import {  useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDeleteBookMutation, useSingleBookQuery } from '../redux/features/book/bookApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useAppSelector } from '../redux/hook';
import Reviews from '../components/Reviews';
import toast from "react-hot-toast";
import Error from '../components/Error';
import LoadingSpinner from '../components/LoadingSpinner';

const BookDetails = () => {
  const  {user} = useAppSelector (state=>state.user)
  const {bookId} = useParams()
  const {data:book,isLoading,isError} = useSingleBookQuery(bookId)
  const navigate  = useNavigate()
  const [deleteBook,{isSuccess}] = useDeleteBookMutation();
 

  const handleDeleteBook =() => {
   if(book?.data?._id)deleteBook(book?.data?._id)
   toast("Delete", {duration:3000});
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
      <h1 className="text-2xl font-bold mb-4">Title: {book?.data?.title}</h1>
        <p className="text-lg font-semibold mb-4">Author: {book?.data?.author}</p>
        <p className="text-lg mb-4">Genre: {book?.data?.genre}</p>
        <p className="text-lg mb-4">Publish Date: {book?.data?.publicationDate}</p>
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
       {isLoading && <LoadingSpinner/>}
                {isError && (
                    <Error message="There was an error adding book!" />
                )}
       
        <Reviews id={book?.data?._id}/>
      </div>
    </div>
  );
};

export default BookDetails;
