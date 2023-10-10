import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/store";
import { cancelUserOrder, getOrderDetails } from "../features/order/orderSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "../Components/SpinnerLoader";
import { Badge, Box, Button, Divider, HStack, Heading, Image, ListItem, Stack, Text, UnorderedList, VStack } from "@chakra-ui/react";

export default function OrderDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { loading, orderDetail } = useAppSelector(state => state.order)
  const { id } = useParams()
  // const toast = useToast({
  //   title: '',
  //   status: 'success',
  //   position: 'bottom-right',
  //   containerStyle: {
  //     maxWidth: '100%',
  //   },
  //   duration: 3000, // Toast duration in milliseconds
  //   isClosable: true, // Allow the user to close the toast
  // })

  useEffect(() => {
    dispatch(getOrderDetails({ id: id! }))
  }, [])

  const cancelOrder = () => {
    dispatch(cancelUserOrder({ id: id! })).then(res => {
      console.log(res)
      navigate('/order')
    })
  }

  if (!id) {
    return <>Not found</>
  }
  if (loading) {
    return <SpinnerLoader />
  }
  return (
    <Box p={{ base: 1, md: 6 }} m='auto' w={{ base: '100%', md: '70%' }}>
      <Heading>Order Details</Heading>
      {orderDetail.status !== 'canceled' &&
       orderDetail.paymentStatus === 'succeeded' &&
        <Badge colorScheme='green'>Success</Badge> 
      }
      {orderDetail.status === 'canceled' && 
        <Badge colorScheme='red'>Canceled</Badge>
      }
      {orderDetail.paymentStatus !== 'succeeded' && <Badge colorScheme='red'>Payment failed</Badge> }
      <Stack pt='4' flexDirection={{ base: 'column', sm: "row" }} justifyContent='space-between'>
        <Text>Order on{new Date(orderDetail.createdAt).toLocaleDateString()}</Text>
        <Text>Order id: {orderDetail._id}</Text>
      </Stack>
      <br />
      <HStack p='4' alignItems={{ base: 'center', sm: 'flex-start' }} flexDirection={{ base: 'column', sm: 'row' }} gap={{ base: '2rem', sm: "1rem" }} justifyContent='space-between' border='1px solid lightgray' borderRadius='8' fontSize={14} textAlign='left'>
        <VStack minWidth='10rem'>
          <Text as='span' width='100%' fontWeight='bold'>Shipping address</Text>
          <UnorderedList listStyleType='none' w='100%' pl={{ base: 0, sm: '4' }}>
            {Object.values(orderDetail.shippingDetails.address).map((field, index) =>
              <ListItem key={index} >{field}</ListItem>
            )}
          </UnorderedList>
        </VStack>
        <Stack minWidth='10rem'>
          <Text fontWeight='bold'>Payment Method</Text>
          <Text>Card</Text>
        </Stack>
        <VStack minWidth='10rem'>
          <HStack justifyContent='space-between' gap="6" width='100%'>
            <Text fontWeight='bold'> Order summery</Text>
            <Text></Text>
          </HStack>
          <HStack justifyContent='space-between' gap="6" width='100%'>
            <Text>Total Items:</Text>
            <Text> {orderDetail.orderDetails.totalItems}</Text>
          </HStack>
          <HStack justifyContent='space-between' gap="6" width='100%'>
            <Text> Item(s) subtotal:</Text>
            <Text>&#8377;{orderDetail.orderDetails.totalPrice}</Text>
          </HStack>
          <HStack justifyContent='space-between' gap="6" width='100%'>
            <Text> Shipping:</Text>
            <Text>Free</Text>
          </HStack>
          <HStack justifyContent='space-between' gap="6" width='100%'>
            <Text>Total:</Text>
            <Text pt='4'> &#8377;{orderDetail.orderDetails.totalPrice}</Text>
          </HStack>
        </VStack>
      </HStack>
      <br />
      <Box border='1px solid lightgray' borderRadius='10px'>
        {orderDetail.orderDetails.products.map((item, index) =>
          <Box key={index} >
            <HStack gap={2} p="2" alignItems='start'>
              <Image src={item.productId.thumbnail} alt={item.productId.title} height='7rem' width='6rem' />
              <VStack alignItems='flex-start' p='2' fontSize={{ base: '12px', md: 'md' }}>
                <Text noOfLines={1} color='#007185' _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  <Link to={`/product/${item.productId._id}`}>{item.productId.title}</Link>
                </Text>
                <Text>&#8377; {item.productId?.price?.cost}</Text>
              </VStack>
            </HStack>
            <Divider width='100%' />
          </Box>
        )}
      </Box>
      {orderDetail.status !== 'canceled' && orderDetail.paymentStatus === 'succeeded' && <Button type="submit" onClick={cancelOrder} size="sm" mt='4' width="10rem" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Cancel Order</Button>}
    </Box>
  )
}
