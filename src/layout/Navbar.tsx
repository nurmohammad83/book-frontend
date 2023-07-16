/* eslint-disable @typescript-eslint/no-floating-promises */

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase.config/firebase";
import { setUser } from "../redux/features/user/userSlice";


const Navbar : React.FC = () => {
  const {user} = useAppSelector(state=>state.user)
  const dispatch = useAppDispatch()

  const handelLogout = ()=>{
    signOut(auth).then(() => {
      dispatch(setUser(null))
    })
  }


  return (
    <nav className="py-4 2xl:px-6 border-b">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/">
         <h1 className="text-xl">GenericStore</h1>
        </Link>

        <ul className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="cursor-pointer"
            
          >
            <li>Book Store</li>
          </Link>
         {
          user.email &&  <Link to="/add-book" className="cursor-pointer">
          <li>Add Book</li>
        </Link>
         }
         
        </ul>

       
          <div className="flex items-center space-x-5 rounded-md bg-white">
         {
          !user.email && <>
           <Link to="/login" className="cursor-pointer">
            <li className="list-none">LogIn</li>
          </Link>
          <Link to="/signup" className="cursor-pointer">
            <li className="list-none">SignUp</li>
          </Link></>
         }
         {
          user.email &&  <button className="cursor-pointer" onClick={()=>handelLogout()}>
          <li className="list-none">Logout</li>
        </button>
         }
          </div>
       
      </div>
    </nav>
  );
};

export default Navbar;