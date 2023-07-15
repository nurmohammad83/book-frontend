import { Outlet } from 'react-router-dom';
import Footer from "./Footer"
import Navbar from "./Navbar"

const Root = () => {
  return (
    <div>
    <Navbar />
    <div className="pt-16">
      <Outlet />
    </div>
    <Footer />
  </div>
  )
}
export default Root