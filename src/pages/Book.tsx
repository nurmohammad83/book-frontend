import { Link, useNavigate } from "react-router-dom";
import { IBook } from "../types";
import Button from "../components/Button";
import { useAddToWishListMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
interface IProps {
    book: IBook;
  }
const Book = ({ book }:IProps) => {
  const {email} = useAppSelector(state=>state.auth)
  const navigate = useNavigate();
  const [addToWishList,{data:wishList,isSuccess,isError}]=useAddToWishListMutation()
  const {_id,thumbnail,genre,author,title,publicationDate} = book


  const handelAddWishList= (book:IBook)=>{
    if(!email){
      navigate('/login')
      toast('Please login',{duration:2000})
    }else {
      addToWishList(book)
    }
  }

  useEffect(()=>{
    if(isSuccess){
      toast('Added Wishlist',{duration:2000})
    }if(isError){
      toast(wishList.message,{duration:2000})
    }
  },[isError,isSuccess,wishList])

    return (
      <div
        className="flex  rounded-lg p-1 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  flex-row">
        <img
          className="h-64 w-full rounded-t-lg object-cover  md:w-48 md:rounded-none md:rounded-l-lg"
          src={thumbnail}
          alt="" />
        <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col justify-start p-6">
            <span className="text-sm text-black opacity-50">{genre}</span>
          <h5
            className="mb-2 text-lg font-medium text-neutral-800 ">
            {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 ">
           Author: {author}
          </p>
          <p className="text-xs text-neutral-500 ">
           {publicationDate}
          </p>
        </div>
        <div className="flex justify-end space-x-3 p-4">
          <Button onClick={()=>handelAddWishList(book)}>AddToWishlist</Button>
          <Link  to={`/book/${_id}`}>
          <Button>See Details</Button>
          
          </Link>
        </div>
        </div>
      </div>
      );
};

export default Book;