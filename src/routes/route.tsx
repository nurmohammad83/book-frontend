import {createBrowserRouter } from 'react-router-dom'
import App from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../components/NotFound';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import Home from '../pages/Home';
import BookDetails from '../pages/BookDetails';
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
                path:'/:bookId',
                element:<BookDetails />
            },
            {
                path:'/add-book',
                element:<AddBook />
            },
            {
                path:'/edit-book',
                element:<EditBook />
            },
          ],
    },
    
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/signup',
        element:<Signup />
    },
    {
        path:'*',
        element:<NotFound />
    },
])

export default router;