import { Box, Button, Divider, HStack, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetCart from '../hooks/getCart';
import CartProductCard from '../Components/CartProductCard';



export default function Cart() {
    const location = useLocation()
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";
    const { data: cart, isFetching } = useGetCart(token)


    if (isFetching) {
        return <Box     width='100%' display='flex' justifyContent= 'center'  height= '30vh'  alignItems='flex-end'>
            <Spinner speed='0.3s'
                m="auto"
                emptyColor='gray.200'
                color='blue.500'
                size='xl' />
        </Box>
    }

    return (
        <>
            {!cart ?

                <>
                {
                        !token && <HStack m="auto" mt="6rem" width="100%" flexDirection={{ base: "column", md: "row" }} justifyContent="center">
                            <Image src="https://firebasestorage.googleapis.com/v0/b/angular-e92b6.appspot.com/o/cart.svg?alt=media&token=f1f006eb-69b1-4838-af15-e476b22a399c" width="20rem" />
                            <VStack gap="2" padding={{ base: "6", md: "0" }}>
                                <Heading as="h4" size="lg">Your Amazon cart is empty</Heading>
                                <Text w="100%" as="span" fontSize="sm" py="0">Shop today's deals</Text>
                                <HStack w="100%" mt="4">
                                    <Button size='sm' onClick={() => navigate('/signin', { state: { prevUrl: location.pathname } })} boxShadow='lg' backgroundColor="#FFD814" _hover={{ transition: "none" }}>
                                        Signin to your account
                                    </Button>
                                    <Button size='sm' onClick={() => navigate('/signup', { state: { prevUrl: location.pathname } })} boxShadow='lg' variant="outline" bg="white">
                                        Signup now
                                    </Button>
                                </HStack>
                            </VStack>
                        </HStack>
                }
                </>
                :
                <HStack p="4" pt="8" alignItems="flex-start" justifyContent="space-between" backgroundColor="#EAEDED">
                    <Box p="6" width="80%" border="1px solid lightgray" backgroundColor="white">
                        <Heading size="lg" pb="2" fontWeight="light">Shopping Cart</Heading>
                        <Divider/>
                        {cart.cartItems.map((item,index)=>
                            <CartProductCard key={index} item={item}/>
                            )}
                    </Box>
                    <Box p="4" textAlign="left">
                        Continue to checkout
                    </Box>
                </HStack>
            }
        </>

    )
}
