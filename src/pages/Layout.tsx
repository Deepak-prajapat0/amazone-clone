import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react';
import NavHeader from '../Components/Header/NavHeader';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);    
  }, [pathname]);

  return (
    <div>
        <Header />
      <Box paddingTop="4rem" minHeight= "100vh">
      {pathname !== '/signin' && pathname !=='/signup'  &&<NavHeader/>}
        <Outlet />
      </Box>
      {pathname !== '/signin' && pathname !== '/signup' && <Footer />}
    </div>
  )
}
