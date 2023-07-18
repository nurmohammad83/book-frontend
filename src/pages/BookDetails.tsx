import {  useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useAddToReadingMutation, useDeleteBookMutation, useSingleBookQuery } from '../redux/features/book/bookApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useAppSelector } from '../redux/hook';
import Reviews from '../components/Reviews';
import toast from "react-hot-toast";
import Error from '../components/Error';
import LoadingSpinner from '../components/LoadingSpinner';

const BookDetails = () => {
  const  {email} = useAppSelector (state=>state.auth)
  const {bookId} = useParams()
  const navigate  = useNavigate()
  const {data:book,isLoading,isError} = useSingleBookQuery(bookId)
  const [deleteBook,{isSuccess}] = useDeleteBookMutation();
  const [addToReadinglist,{data:readBook,isSuccess:success,isError:error}] = useAddToReadingMutation()
console.log(readBook)
  const handleDeleteBook =() => {
    const agree = confirm("Are you sure delete this book?");
    if (agree) {
      if(book?.data?._id)deleteBook(book?.data?._id)
       toast("Delete", {duration:3000});
    }
  
  };

  const handelReadingList = ()=>{
    if(!email){
      navigate('/login')
      toast('Please login',{duration:2000})
    }else {
    addToReadinglist({...book.data,isReading:true,isFinished:false})
  }
  }
  useEffect(()=>{
    if(success){
      toast('Added Reading list',{duration:2000})
    }if(error){
      toast('Something want to wrong!')
    }
  },[success,error])

  useEffect(()=>{
    if(isSuccess){
      navigate('/')
    }
  },[isSuccess,navigate])
  return (
    <div className="container mx-auto my-4">
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
      email &&  email !== book?.data?.userEmail && <div className="flex justify-between items-center mt-4">
      <Link to={`/add-book`}>
      <Button  color='success'> <AiOutlineEdit className="mr-2" /> Add Book</Button>
      </Link>
      <Button onClick={handelReadingList} > <AiOutlineEdit className="mr-2" /> Read Book</Button>
      </div>
     }
       {
        email === book?.data?.userEmail && <div className="flex justify-between items-center mt-4">
        <Link to={`/edit-book/${bookId}`}>
        <Button  color='success'> <AiOutlineEdit className="mr-2" /> Edit Book</Button>
        </Link>
         <Button onClick={handleDeleteBook}  color='danger'> <AiOutlineDelete className="mr-2" /> Delete Book</Button>
        
       </div>
       }
       {isLoading && <LoadingSpinner/>}
                {isError && (
                    <Error message="No book found!" />
                )}
       
        <Reviews id={book?.data?._id}/>
      </div>
    </div>
  );
};

export default BookDetails;
