import {Box, Spinner } from "@chakra-ui/react";

export default function SpinnerLoader() {
  return (
      <Box width='100%' display='flex' justifyContent='center' height='30vh' alignItems='flex-end'>
          <Spinner speed='0.3s'
              m="auto"
              emptyColor='gray.200'
              color='blue.500'
              size='xl' />
      </Box>
  )
}
