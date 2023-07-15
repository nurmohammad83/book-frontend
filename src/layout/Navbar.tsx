
import { Link } from "react-router-dom";


const Navbar = () => {
  

  return (
    <nav className="py-4 2xl:px-6 border-b">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/">
         <h1 className="text-xl">BookStore</h1>
        </Link>

        <ul className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="cursor-pointer"
            
          >
            <li>Book Store</li>
          </Link>
          <Link to="/add-book" className="cursor-pointer">
            <li>Add Book</li>
          </Link>
          <Link to="/add-book" className="cursor-pointer">
            <li>Edit Book</li>
          </Link>
         
        </ul>

       
          <div className="flex items-center space-x-5 rounded-md bg-white">
          <Link to="/login" className="cursor-pointer">
            <li className="list-none">LogIn</li>
          </Link>
          <Link to="/signup" className="cursor-pointer">
            <li className="list-none">SignUp</li>
          </Link>
          </div>
       
      </div>
    </nav>
  );
};

export default Navbar;