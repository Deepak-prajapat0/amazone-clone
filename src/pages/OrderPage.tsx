import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../features/store"
import { getUserOrders } from "../features/order/orderSlice"
import { Box, Card, CardBody, Divider, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Order } from "../models/orderModel"
import { Link } from "react-router-dom"
import SpinnerLoader from "../Components/SpinnerLoader"

export default function OrderPage() {
  const dispatch = useAppDispatch()
  const {loading} = useAppSelector(state=>state.order)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    dispatch(getUserOrders()).then(res => {
      if (res.payload) {
        setOrders(res.payload.order)
      }
    })
  }, [])


  if(loading){
    return <SpinnerLoader/>
  }

  return (
    <Box m='auto' p='2' pt={{ base: '8', md: "12" }} pb='10' width={{ base: '100%', md: '80%' }}>
      <Heading size='lg'>Your Orders</Heading>
      <br />
      <br />
      <VStack width='100%' >
        {orders.map((order: Order, index) =>
          <VStack key={index} w='inherit' gap='0' border='1px solid lightgray' borderRadius="10px">
            <Card variant='filled' w='inherit' borderRadius="10px 10px 0 0">
              <CardBody fontSize={{ base: '10px', sm: '13px' }} p={{ base: '2', md: "4" }} display='flex' flexDirection='row' justifyContent='space-between'>
                <HStack gap={{base:'1rem', md: '6rem'}}>
                  <VStack>
                    <Text>Order Placed</Text>
                    <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
                  </VStack>
                  <VStack>
                    <Text>Total</Text>
                    <Text>&#8377;{order.orderDetails.totalPrice}</Text>
                  </VStack>
                </HStack>
                <VStack w="fit-content" alignItems='flex-end' >
                  <Text>OrderId: {order._id}</Text>
                  <Link to={`/order/${order._id}`} className="link">view order details</Link>
                </VStack>
              </CardBody>
            </Card>
            <HStack w='inherit' p='2' justifyContent='space-between' position='relative' borderTop='1px solid lightgray'>
              <HStack alignItems='start'>
                <Image src={order.orderDetails.products[0].productId.thumbnail} height={{base:'6rem',md:"6rem"}} width={{base:'6rem',md:"6rem"}} />
                <Text pt='2' fontSize={{ base: '11px', md: '16' }}>{order.orderDetails.products[0].productId.title}</Text>
                <Text as='span' position='absolute' bottom='0' right='1rem'><Link to={`/order/${order._id}`} className="link">{order.orderDetails.products.length > 1 && '+' + (order.orderDetails.products.length - 1) + '  more'}</Link></Text>
              </HStack>
            </HStack>
          </VStack>

        )}

      </VStack>

    </Box>
  )
}
