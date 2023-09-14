import { Box, Image, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react';

interface Props{
    children:ReactNode;
}

export default function FormContainer({children}:Props) {
  return (
      <VStack pb="2" px="1" margin="auto" maxWidth="22rem" alignItems="stretch">
          <Image src="https://firebasestorage.googleapis.com/v0/b/angular-e92b6.appspot.com/o/amazon-brand-name.png?alt=media&token=451ba7dc-b780-4ba6-bf45-22aebed3f0c7" alt="logo name" height="2rem" margin="auto" marginBottom="1.5rem" />
          <Box border="1px solid lightgray" borderRadius=".6rem" >
            {children}
          </Box>
      </VStack>
  )
}
