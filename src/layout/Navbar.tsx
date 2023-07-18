import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logOut } from '../redux/features/auth/authSlice';
import Button from '../components/Button';

const Navbar : React.FC = () => {
  const {accessToken,email} = useAppSelector(state=>state.auth)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
console.log(email)
  const handelLogout = ()=>{
    localStorage.removeItem("auth");
    dispatch(logOut());
    toast('Log out',{duration:2000})
    navigate("/");
  }


  return (
    <nav className="py-4 2xl:px-6 border-b">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/">
         <h1 className="text-lg font-extrabold text-teal-500">GeniusStore</h1>
        </Link>

        <ul className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="cursor-pointer"
            
          >
            <li>Book Store</li>
          </Link>
         {
          accessToken &&  <>
          <Link to="/wishlist" className="cursor-pointer">
          <li>WishList</li>
        </Link>
          <Link to="/readlist" className="cursor-pointer">
          <li>ReadingList</li>
        </Link>
          </>
         }
         
        </ul>

       
          <div className="flex items-center space-x-5 rounded-md bg-white">
         {
          !accessToken && <>
           <Link to="/login" className="cursor-pointer">
            <li className="list-none">LogIn</li>
          </Link>
          </>
         }
         {
          accessToken &&  <Button onClick={handelLogout}>Logout</Button>
         }
          </div>
       
      </div>
    </nav>
  );
};

export default Navbar;