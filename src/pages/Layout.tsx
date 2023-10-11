import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import NavHeader from '../Components/Header/NavHeader';

export default function Layout() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);    
  }, [pathname]);

  // const dispatch = useAppDispatch()

  // useEffect(()=>{
  //   let user = localStorage.getItem('user');
  //   let token = localStorage.getItem('token')
  //   dispatch(setCredentials({user,token}))
  // },[])


  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //     const user = localStorage.getItem("token");

  //     if (user) {
  //       const decodedJwt = parseJwt(user);

  //       if (decodedJwt.exp * 1000 < Date.now()) {
  //         apiClient.refreshToken({refreshToken:localStorage.getItem('refresh-token')}).then(res=>{
  //           console.log(res)
  //           localStorage.setItem('token',res.data.token)
  //           dispatch(setCredentials(res.data))
  //         })
  //         .catch(()=>{
  //           apiClient = new APIClient('/logout')
  //           apiClient.logout().then(res=>{
  //             console.log(res)
  //             dispatch(logout())
  //             navigate('/signin')
  //           })
  //         })
  //       }
  //     }
  //   }
  // }, [pathname,dispatch]);

  return (
    <div>
      {/* <Provider store={store}> */}
        <Header />
      <Box paddingTop="4rem" minHeight= "100vh" >
      {pathname !== '/signin' && pathname !=='/signup'  &&<NavHeader/>}
          <Outlet />
      </Box>
      {pathname !== '/signin' && pathname !== '/signup' && <Footer />}
        {/* </Provider> */}
    </div>
  )
}
