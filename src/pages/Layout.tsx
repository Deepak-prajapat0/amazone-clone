import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* <div> */}
        <Header />
        <Outlet />
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  )
}
