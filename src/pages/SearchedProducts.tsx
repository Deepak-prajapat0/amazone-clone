import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../features/store"
import { searchProduct } from "../features/product/productSlice"
import { Link, useLocation } from "react-router-dom"
import SpinnerLoader from "../Components/SpinnerLoader"
import { Badge, Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react"

export default function SearchedProducts() {
    const dispatch = useAppDispatch()
    const {searchedProducts,loading} = useAppSelector(state=>state.products)
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const search = query.get('q')
    useEffect(()=>{
      if (search){
          console.log(query)
            dispatch(searchProduct({q:search}))
        }
    },[search])

    if(loading){
      return <SpinnerLoader/>
    }
  return (
    <Box p='4'>
      <Heading>Search result for: {search}</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 ,lg:5 }} pt="6" spacing='10px' justifyItems='center'>
      {searchedProducts.map((product,index)=>
        <Box key={index} mx="1" p="2" minWidth="8rem" maxWidth='15rem'>
          <Image src={product.thumbnail} alt={product.title} height="9rem" width="100%" />
          <Link to={`/product/${product._id}`}><Text noOfLines={3} pointerEvents="all" cursor="pointer" _hover={{ textDecoration: 'underline' }} color="#088EC4" style={{ fontSize: "clamp(10px, 4vw, 14px)" }}>{product.title}</Text></Link>
          <Text fontSize={18} mt={2}>&#8377;{product.price.cost} <Badge padding="4px 8px" backgroundColor="#CC0C39" color="white" fontSize="11">{product.price.discount} off</Badge></Text>
        </Box>
          )}
      </SimpleGrid>

    </Box>
  )
}
