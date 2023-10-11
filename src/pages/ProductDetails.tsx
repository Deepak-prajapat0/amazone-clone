import { useParams } from "react-router-dom";
import { Box, Button, Divider, HStack, Heading, Image, ListItem, Show, Text, UnorderedList, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TfiTruck } from "react-icons/tfi";
import { BsBoxSeam, BsCashCoin } from "react-icons/bs";
import { GiLaurelsTrophy } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../features/store";
import { addToCart } from "../features/cart/cartSlice";
import { getProduct } from "../features/product/productSlice";
import SpinnerLoader from "../Components/SpinnerLoader";
import useProductHistory from '../hooks/useProductHistory'


export default function ProductDetails() {
  const { addProductToHistory } = useProductHistory();
  const dispatch = useAppDispatch()
  const {product,loading} = useAppSelector(state=>state.products)
  const [adding, setAdding] = useState(false)
  const { id } = useParams()
  const [image, setImage] = useState(0)



  const toast = useToast({
    // position: 'top',
    title: 'dfgdfgdfgdfgdfg',
    status: 'success',
    position:'bottom-right',
    containerStyle: {
      maxWidth: '100%',
    },
    duration: 3000, // Toast duration in milliseconds
    isClosable: true, // Allow the user to close the toast
  })

  useEffect(()=>{
    dispatch(getProduct({id:id!})).then(res=>{
      if(res.payload){
        // to add in product history 
        addProductToHistory(res.payload.product)
      }
    })
  },[])

  const addProductInCart = async (product: any) => {
   if(localStorage.getItem('token')){
     setAdding(true)
     dispatch(addToCart({ productId: product._id })).then((res: any) => {
       localStorage.setItem('cart', JSON.stringify(res.payload.cart))
       setAdding(false)
       toast({ title: res.payload.msg })
     })
       .catch((error) => {
         setAdding(false)
         toast({ title: error.message })
       })
   }
   else{
    toast({title:'Please login'})
   }
  }


  if (!id) {
    return
  }

  if (loading) {
 return <SpinnerLoader/>
  }

  return (
    <Box p="4" >
      {/* image box */}
    <Box display="flex" gap="5px" flexDirection={{ base: "column", md: "row" }} flexWrap="nowrap" justifyItems="center">
        <Box maxWidth="35rem" display="flex" flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "start" }} gap="5px" position="sticky" top="0" left="0">
          <Box display="flex" gap="6px" flexDirection={{ base: "row", md: "column" }} minWidth="4rem">
            {product.image_url.map((url: string, index: number) =>
              <Image key={index} src={url} onClick={() => setImage(index)} alt="multiple photos" height="5rem" width="5rem" cursor="pointer" border='1px solid lightgray' />
            )}
          </Box>
          <Image src={product.image_url[image]} maxWidth="22rem" />
        </Box>


        {/* detailbox */}
        <VStack maxWidth="30rem" alignItems="start" gap="1" px="4" fontSize={24}>
          <Heading pt="4" size={{ base: "md", sm: "lg" }}>{product.title}</Heading>
          <Text fontSize="14px" color="#307AC6">{product.brand}</Text>
          <Text as="span"><span style={{ color: "#CC0D3A" }}>-{product.price.discount} </span>&#8377;{product.price.cost}</Text>
          <Text as="span" fontSize="11px" color="blackAlpha.700">M.R.P: <Text as="span" textDecoration="line-through"> {product.price.mrp}</Text></Text>
          <Box fontSize={14} pt="2">
            <Text>Inclusive of all taxes</Text>
            <Text>EMI start at &#8377;200</Text>
            <Text>EMI available</Text>
          </Box>
          <Show below="md">
            <VStack maxWidth="20rem" h="max-content" p="4" alignItems='flex-start'>
              <Text fontSize="14" fontWeight="bold"><span style={{ color: "#307AC6" }}>Free delivery</span> Monday, 28 October.Order within 19hrs.</Text>
              <Button size="sm" h="9" width="80%" borderRadius="16" colorScheme="yellow" bg="#FFD814" fontWeight="light" isLoading={adding} loadingText='Adding ...' isDisabled={product.stock === 0} onClick={() => addProductInCart(product)} >Add to Cart</Button>

            </VStack>
          </Show>
          <br />
          <Divider />
          <HStack fontSize={20} py="4">
            <VStack>
              <TfiTruck />
              <span style={{ fontSize: "12px" }}>Free Delivery</span>
            </VStack>
            <VStack>
              <BsCashCoin />
              <span style={{ fontSize: "12px" }}>Cash on Delivery</span>
            </VStack>
            <VStack>
              <BsBoxSeam />
              <span style={{ fontSize: "12px" }}>Free Delivery</span>
            </VStack>
            <VStack>
              <GiLaurelsTrophy />
              <span style={{ fontSize: "12px" }}>Top brand</span>
            </VStack>
          </HStack>
          <Divider />
          <VStack mt="12" >
            <Heading size="md" textAlign="left" w="90%">Features :</Heading>
            <UnorderedList spacing={1}>
              {product.features.map((feature: any, index: number) =>
                <ListItem key={index} fontSize="sm">{feature}</ListItem>
              )}
            </UnorderedList>
          </VStack>
        </VStack>


        {/* button box */}
        <Show above="md">
          <VStack maxWidth="18rem" h="max-content" p="4" border="1px solid lightgray" borderRadius="8">
            <Text fontSize="14" textAlign='center' fontWeight="bold"><span style={{ color: "#307AC6" }}>Free delivery</span> Monday, 28 October.Order within 19hrs.</Text>
            <Button size="sm" h="9" width="80%" colorScheme='yellow' bg="#FFD814" borderRadius="16" fontWeight="light" isLoading={adding} loadingText='Adding ...' isDisabled={product.stock === 0} onClick={() => addProductInCart(product)} >Add to Cart</Button>

          </VStack>
        </Show>
    </Box>

      <Box mt='10' width={{ base: '100%', md: '70%' }} border='1px solid lightgray' borderRadius='10px'>
        {product.productDetails.map((entery,index)=>
          <HStack key={index} justifyContent='space-between' border='1px solid lightgray' fontSize={{base:'11px',md:'14px'}}>
            <Text>{entery.key}:</Text>
            <Text width={{ base: 'fit-content', sm: '60%' }}>{entery.value}</Text>
          </HStack>
        )}
      </Box>

    </Box>
  )
}
