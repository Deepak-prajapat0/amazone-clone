import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Header from '../Components/Header/Header'
import { Box, Image } from '@chakra-ui/react'

export default function ErrorPage() {
    const error = useRouteError()
  return (
    <>
    <Header/>
          <Box paddingTop="4rem">{isRouteErrorResponse(error) && 
          
        <Image src='https://t4.ftcdn.net/jpg/03/88/63/83/360_F_388638369_wSBADhKfhiTx6Q5Pz1xfdpy6zotku1Sg.jpg' width='50%' margin='auto'/>
          
          }</Box>
    </>
  )
}
