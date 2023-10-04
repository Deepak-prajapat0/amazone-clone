import { Box, FormControl, FormLabel, Heading, Input, Stack, VStack, Text, Button } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import APIClient from "../services/api-client";

export default function Checkout() {
    const[cartData,setCartdata]= useState(JSON.parse(localStorage.getItem('cart')|| ''))

   useEffect(()=>{
       let data = JSON.parse(localStorage.getItem('cart')||'')
       setCartdata(data)
   },[])


    const apiClient = new APIClient('/payment');
// payment integration
   const createOrder=async()=>{

    
       const stripe = await loadStripe('pk_test_51NdRM1SGor658vyKfuSsZbktNn3sUMNAWjvXR6EfEAz8SYEK8n8hsQpIY81ZBpc4WTpjb0Ozs1k5LWPFwN1v9E3W00hsS1gbP2');

       const response = await apiClient.payment({ cart: cartData })   
    

       const session = await response;
       console.log(session)

       const result = stripe?.redirectToCheckout({
        sessionId:session.id
       })


       if((await result)?.error){
        console.log('errorr')
       }
   }


  return (
    <>
    {cartData && 
              <Box p="4" pb="12" backgroundColor="#EAEDED">
                    <Heading>Shipping Details</Heading>
                  <Stack flexDirection={{ base: 'column', md: 'row' }} gap="10" mt="8">
                      <Box width={{ base: "100%", md: "90%" }} >
                          <Box width={{ base: "100%", md: "80%" }} p="6" border="1px solid lightgray" borderRadius="10px" backgroundColor="white">
                              <FormControl>
                                  <FormLabel>Name</FormLabel>
                                  <Input type='text' />
                              </FormControl>
                              <FormControl>
                                  <FormLabel>Phone</FormLabel>
                                  <Input type='number' />
                              </FormControl>
                              <FormControl>
                                  <FormLabel>House</FormLabel>
                                  <Input type='text' />
                              </FormControl>
                              <FormControl>
                                  <FormLabel>Street</FormLabel>
                                  <Input type='text' />
                              </FormControl>
                              <FormControl>
                                  <FormLabel>City</FormLabel>
                                  <Input type='text' />
                              </FormControl>
                              <FormControl>
                                  <FormLabel>State</FormLabel>
                                  <Input type='text' />
                              </FormControl>
                              <FormControl>
                                  <FormLabel>Pincode</FormLabel>
                                  <Input type='number' />
                              </FormControl>
                          </Box>
                      </Box>
                      <Box p="4" height="fit-content" width={{ base: "100%", md: "18rem" }} border="1px solid lightgray" borderRadius="10px" backgroundColor="white">
                          <VStack fontSize={10} gap="0" fontWeight="semibold">
                              <Text as="span" color="#077e63"> Your order is eligible for FREE Delivery</Text>
                              <Text as="span">Select the option at checkout</Text>
                          </VStack>
                          <Text as='h6' my="2" fontSize="md" fontWeight="bold" textAlign="center">Subtotal ({cartData?.totalItems}items): &#8377;{cartData.totalPrice}</Text>
                          <Button colorScheme='yellow' bg="#FFD814" size="sm" w="100%" onClick={createOrder}>Proceed to Pay</Button>
                      </Box>
                  </Stack>
             </Box>
    
    }
    </>
  )
}
