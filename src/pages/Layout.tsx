import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { Box } from '@chakra-ui/react'

export default function Layout() {
  return (
    <div>

        <Header />
      <Box paddingTop={{ base: "7rem", md:"6.8rem"}} minHeight= "100vh">
        <Outlet />
      </Box>
      <Footer />
    </div>
  )
}
