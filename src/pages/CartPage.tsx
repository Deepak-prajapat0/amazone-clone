import { Box, Button, Divider, HStack, Heading, Image, Spinner, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserCart, updateCartAsync } from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../features/store';
import CartProductCard from '../Components/CartProductCard';
import { Cart } from '../models/CartModel';
import { logout } from '../features/auth/authSlice';
import SpinnerLoader from '../Components/SpinnerLoader';


export default function CartPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.cart)
    const [updating, setUpdating] = useState(false)
    const [cartData, setCartData] = useState<Cart>();

    const toast = useToast({
        title: 'Cart updated',
        status: 'success',
        position: 'bottom-right',
        containerStyle: {
            maxWidth: '100%',
        },
        duration: 3000,
        isClosable: true,
    })


    const updateQuantity = async (product: any, quantity: number) => {
        if (product._id.stock < quantity) {
            toast({ title: "Maximum qty " })
            
        }
        else {
            setUpdating(true)
            dispatch(updateCartAsync({productId:product._id,quantity})).then((res:any)=>{
                localStorage.setItem('cart',JSON.stringify(res.payload.cart))
                setCartData(res.payload.cart)
                setUpdating(false)
                toast()
            })
        }

    }


    useEffect(() => {
       if(localStorage.getItem('token')){
        setUpdating(true)
           dispatch(getUserCart())
               .then((response:any) => {
                   if(response.payload){
                       setCartData(response.payload.cart);
                       localStorage.setItem('cart', JSON.stringify(response.payload.cart))// Assuming your action returns the data in payload
                       setUpdating(false)
                    }
                })
                .catch((error) => {
                    console.log('error')
                   setUpdating(false)
                    if (error.response && error.response.status === 401) {
                       dispatch(logout())
                        localStorage.clear()
                    }
               });
       }
    }, [dispatch])


    const proccedToBuy = () => {
        navigate('/cart/checkout')
    }

    if (loading && !cartData) {
        return <SpinnerLoader/>
    }

    return (
        <>
            {cartData && cartData.cartItems.length <1 ?

                <>
                    {
                        <HStack m="auto" mt="6rem" width="100%" flexDirection={{ base: "column", md: "row" }} justifyContent="center">
                            <Image src="https://firebasestorage.googleapis.com/v0/b/angular-e92b6.appspot.com/o/cart.svg?alt=media&token=f1f006eb-69b1-4838-af15-e476b22a399c" width="20rem" />
                            <VStack gap="2" padding={{ base: "6", md: "0" }}>
                                <Heading as="h4" size="lg">Your Amazon cart is empty</Heading>
                                <Text w="100%" as="span" fontSize="sm" py="0">Shop today's deals</Text>
                                <HStack w="100%" mt="4">
                                    {/* <Button size='sm' onClick={() => navigate('/signin', { state: { prevUrl: location.pathname } })} boxShadow='lg' backgroundColor="#FFD814" _hover={{ transition: "none" }}>
                                        Signin to your account
                                    </Button>
                                    <Button size='sm' onClick={() => navigate('/signup', { state: { prevUrl: location.pathname } })} boxShadow='lg' variant="outline" bg="white">
                                        Signup now
                                    </Button> */}
                                    <Button size='sm' onClick={() => navigate('/')} boxShadow='lg' variant="outline" bg="white">
                                        Shop Now
                                    </Button> 
                                </HStack>
                            </VStack>
                        </HStack>
                    }
                </>
                :
                <Stack p="4" pt="8" minHeight="90vh" flexDirection={{ base: "column-reverse", md: "row" }} alignItems="flex-start" justifyContent="space-between" backgroundColor="#EAEDED">
                     <Box p={{ base: "2", md: "5" }} width={{ base: "100%", md: "80%" }} border="1px solid lightgray" backgroundColor="white">
                        {cartData &&
                        <>
                            <Heading size="lg" pb="2" fontWeight="light">Shopping Cart</Heading>
                            <Divider />
                            {cartData.cartItems.map((item: any, index: number) =>
                            <CartProductCard key={index} item={item} updateQuantity={updateQuantity} />)}
                            <Text as='h6' fontSize="lg" fontWeight="bold" textAlign="right">Subtotal ({cartData?.totalItems} items): &#8377;{cartData?.totalPrice}</Text>
                        </>
                        }
                    </Box>
                    <Box p="4" width={{ base: "100%", md: "18rem" }} position='relative' border="1px solid lightgray" backgroundColor="white">
                        {updating && <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            position='absolute'
                            top='14%'
                            left='44%'
                        />}
                        <VStack fontSize={10} gap="0" fontWeight="semibold">
                            <Text as="span" color="#077e63"> Your order is eligible for FREE Delivery</Text>
                            <Text as="span">Select the option at checkout</Text>
                        </VStack>
                        <Text as='h6' my="2" fontSize="md" fontWeight="bold" textAlign="center">Subtotal ({cartData?.totalItems} items): &#8377;{cartData?.totalPrice}</Text>
                        <Button colorScheme='yellow' bg="#FFD814" size="sm" w="100%" isDisabled={!cartData?.totalItems || updating} onClick={proccedToBuy}>Proceed to Buy</Button>
                        {/* {JSON.stringify(cartData)} */}
                    </Box>
                </Stack>
             } 
            {/* {loading ? <span>loading ....</span>
    :  
            <div>{JSON.stringify(cartData)}</div>
        } */}
        </>

    )
}
// function updateUserCart(_id: any, quantity: number): any {
//     throw new Error('Function not implemented.');
// }

