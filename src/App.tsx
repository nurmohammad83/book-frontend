import { ToastContainer } from "react-toastify"
import Root from "./layout/Root"
import {useEffect} from 'react'
import { useAppDispatch } from "./redux/hook"
import { setLoading, setUser } from "./redux/features/user/userSlice"
import { auth } from "./components/firebase.config/firebase"
import { onAuthStateChanged } from "firebase/auth"

const App = () => {
  const dispatch=useAppDispatch()
  useEffect(()=>{
    dispatch(setLoading(true))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email))
        dispatch(setLoading(false))
      } 
    });
  },[dispatch])
  return (
    <div>
      <Root />
      <ToastContainer />
    </div>
  )
}
export default App