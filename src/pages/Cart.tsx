import { Box, Button, Divider, HStack, Heading, Image, Spinner, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetCart from '../hooks/getCart';
import CartProductCard from '../Components/CartProductCard';
import useUpdateCart from '../hooks/useUpdateCart';
import { useEffect } from 'react';


export default function Cart() {
    const location = useLocation()
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";
    const updateCart = useUpdateCart()
    let { data, isFetching } = useGetCart(token)
    // const[data,setData]= useState(cart)

    const toast = useToast({
        title: 'dfgdfgdfgdfgdfg',
        status: 'success',
        position: 'bottom-right',
        containerStyle: {
            maxWidth: '100%',
        },
        duration: 3000,
        isClosable: true,
    })

  
    const updateQuantity =async(product:any,quantity:number)=>{
      if(product._id.stock < quantity){
        toast({title:"Maximum qty "})   
        
      }
      else{
          await updateCart.mutateAsync({ productId:product._id, quantity })
              .then((res: any) => {
                  data = res.cart
                 JSON.parse(localStorage.getItem('cart') || '')
                  toast({ title: res.msg })
              })
              .catch((error: any) => {
                  toast({ title: error.response.data.msg })
              })
      }
       
    }
    useEffect(() => {
        data = JSON.parse(localStorage.getItem('cart') || '')
    }, [updateQuantity])


    const proccedToBuy=()=>{
        localStorage.setItem('cart',JSON.stringify(data))
        navigate('/cart/checkout')
    }

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
            {!data?.cartItems  ?

                <>
                {
                     <HStack m="auto" mt="6rem" width="100%" flexDirection={{ base: "column", md: "row" }} justifyContent="center">
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
                <Stack p="4" pt="8" minHeight="90vh" flexDirection={{base:"column-reverse",md:"row"}} alignItems="flex-start" justifyContent="space-between" backgroundColor="#EAEDED">
                    <Box p={{ base: "2",md:"5" }} width={{ base: "100%", md: "80%" }} border="1px solid lightgray" backgroundColor="white">
                        <Heading size="lg" pb="2" fontWeight="light">Shopping Cart</Heading>
                        <Divider/>
                        {data?.cartItems.map((item,index)=>
                            <CartProductCard key={index} item={item} updateCart={updateCart} updateQuantity={updateQuantity}/>
                            )}
                        <Text as='h6' fontSize="lg" fontWeight="bold" textAlign="right">Subtotal ({data.totalItems} items): &#8377;{data.totalPrice}</Text>
                    </Box>
                    <Box p="4" width={{ base: "100%" ,md:"18rem"}} border="1px solid lightgray" backgroundColor="white">
                        <VStack fontSize={10} gap="0" fontWeight="semibold">
                            <Text as="span" color="#077e63"> Your order is eligible for FREE Delivery</Text>
                            <Text as="span">Select the option at checkout</Text>
                        </VStack>
                        <Text as='h6' my="2" fontSize="md" fontWeight="bold" textAlign="center">Subtotal ({data.totalItems} items): &#8377;{data.totalPrice}</Text>
                        <Button colorScheme='yellow' bg="#FFD814" size="sm" w="100%" onClick={proccedToBuy}>Proceed to Buy</Button>
                    </Box>
                </Stack>
            }
        </>

    )
}
