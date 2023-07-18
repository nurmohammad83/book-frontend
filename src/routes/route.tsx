import {createBrowserRouter } from 'react-router-dom'
import App from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../components/NotFound';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import Home from '../pages/Home';
import BookDetails from '../pages/BookDetails';
import WishlistBook from '../pages/WishlistBook';
import ReadListBook from '../pages/ReadListBook';
import { PrivateRoute } from '../layout/PrivetRoute';
const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children: [
            {
              index: true,
              element: <Home />,
            },
            {
                path:'/book/:bookId',
                element:<BookDetails />
            },
            {
                path:'/add-book',
                element:<PrivateRoute><AddBook /></PrivateRoute>
            },
            {
                path:'/wishlist',
                element:<PrivateRoute><WishlistBook /></PrivateRoute>
            },
            {
                path:'/readlist',
                element:<ReadListBook />
            },
            {
                path:'/edit-book/:id',
                element:<PrivateRoute><EditBook /></PrivateRoute>
            },
             {
                path:'/login',
                element:<Login />
            },
            {
                path:'/signup',
                element:<Signup />
            },
          ],
    },
    {
        path:'*',
        element:<NotFound />
    },
])

export default router;