import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../features/store'
import { getUserWishlist } from '../features/wishlist/wishlistSlice'
import SpinnerLoader from '../Components/SpinnerLoader'
import { Box, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Wishlists() {

  const dispatch = useAppDispatch()
  const { loading, wishlist } = useAppSelector(state => state.wishlist)

  useEffect(() => {
    dispatch(getUserWishlist())
  }, [])


  if (loading) {
    return <SpinnerLoader />
  }
  return (
    <div>{wishlist && wishlist.products.length > 0 &&
      <Box p='6'>
        <Text>Your items (save for later)</Text>
        <SimpleGrid columns={{base:1,sm:2,md:3,lg:4}} spacing={10} >
          {wishlist.products.map((product, index) =>
            <VStack key={index} p='2' gap="4"  border='1px solid lightgray' borderRadius='5px' justifyContent='flex-end' >
              <Image src={product.thumbnail} alt={product.title} height="10rem" width='12rem' />
              <Link to={`/product/${product._id}`} style={{width:'100%'}}><Text noOfLines={2} textAlign='left' fontSize={12} _hover={{textDecoration:'underline'}}>{product.title}</Text></Link>
              <Text as='span' width='100%' textAlign='left'>&#8377; {product.price.cost}</Text>
              {/* <Button size='sm' backgroundColor='#FFD814' onClick={()=>dispatch(updateCartAsync())}>Move to cart</Button> */}
            </VStack>
          )}
        </SimpleGrid>
      </Box>
    }</div>
  )
}
