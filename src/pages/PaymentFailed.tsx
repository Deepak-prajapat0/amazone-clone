import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

export default function PaymentFailed() {
  return (
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='250px'
      margin='auto'
      marginTop="6rem"
      width={{ base: '100%', md: '60%' }}
    >
      <AlertIcon boxSize='60px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Payment Failed
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Your payment was failed.
      </AlertDescription>
    </Alert>
  )
}
