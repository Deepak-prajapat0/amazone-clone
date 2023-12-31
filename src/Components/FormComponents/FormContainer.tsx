import { Box, Image, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react';

interface Props{
    children:ReactNode;
}

export default function FormContainer({children}:Props) {
  return (
      <VStack pb="2" px="1" pt="2rem" margin="auto" maxWidth="22rem" alignItems="stretch">
      <Image src="https://firebasestorage.googleapis.com/v0/b/angular-e92b6.appspot.com/o/amazon.png?alt=media&token=cdeeef14-5e7a-4045-aa43-b9bd8a677b18" alt="logo name" height="2rem" margin="auto" marginBottom="1.5rem" />
          <Box border="1px solid lightgray" borderRadius=".6rem" marginBottom="4rem" >
            {children}
          </Box>
      </VStack>
  )
}
