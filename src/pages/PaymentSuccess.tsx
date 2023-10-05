import { useEffect } from "react"
import APIClient from "../services/api-client"
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function PaymentSuccess() {

  const apiClient = new APIClient('/payment-status')

  useEffect(()=>{
    let paymentRespone = localStorage.getItem('paymentResponse')
   if(paymentRespone){
     let paymentData = JSON.parse(paymentRespone)
     if (paymentData) {
       apiClient.paymentStatus({ id: paymentData.id }).then(() => {
         localStorage.removeItem('paymentResponse')
       })
     }
    }
  },[])

  return (
    <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='250px'
      margin='auto'
      marginTop="6rem"
      width={{base:'100%',md:'60%'}}
    >
      <AlertIcon boxSize='60px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Order placed!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Thanks for order from us. Your order will be dispatch shortly.
      </AlertDescription>
      <Link to='/'>Back to Home</Link >
    </Alert>
  )
}
