import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Box, Button, Divider, HStack, Heading, Image, ListItem, Show, Spinner, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { TfiTruck } from "react-icons/tfi";
import { BsBoxSeam, BsCashCoin } from "react-icons/bs";
import { GiLaurelsTrophy } from "react-icons/gi";
import APIClient from "../services/api-client";
import { useMutation } from "@tanstack/react-query";
// import {mutateAsync} from "../hooks/updateCart";

export default function ProductDetails() {

  const apiClient = new APIClient('/cart')

  const cartMutation=(data:any) => useMutation(apiClient.updateCart, {
    onSuccess: () => {
      console.log("succedd",data);

    }
  })


  const { title } = useParams()

  if (!title) {
    return
  }
  const { data, error, isLoading } = useProduct(title!)

  // const update = updateUserCart();
  const [image, setImage] = useState(0)
  if (isLoading) {
    return <Spinner />
  }
  if (error || !data) return <>Error</>;

  return (
    <Box p="4" display="flex" flexDirection={{ base: "column", md: "row" }} flexWrap="nowrap" justifyItems="center">
      {/* image box */}
      <Box maxWidth="35rem" display="flex" flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "start" }} gap="5px" position="sticky" top="0" left="0">
        <Box display="flex" gap="6px" flexDirection={{ base: "row", md: "column" }} minWidth="4rem">
          {data.image_url.map((url: string, index: number) =>
            <Image key={index} src={url} onClick={() => setImage(index)} alt="multiple photos" height="5rem" width="5rem" cursor="pointer" />
          )}
        </Box>
        <Image src={data.image_url[image]} minWidth="20rem" />
      </Box>
      <Show below="md">
        <VStack width="18rem" h="max-content" p="4" border="1px solid lightgray" borderRadius="8">
          <Text fontSize="14" fontWeight="bold"><span style={{ color: "#307AC6" }}>Free delivery</span> Monday, 28 October.Order within 19hrs.</Text>
          <Button size="sm" h="9" width="80%" borderRadius="16" bg="#FFD814" fontWeight="light" >Add to Cart</Button>

        </VStack>
      </Show>

      {/* detailbox */}
      <VStack maxWidth="30rem" alignItems="start" gap="1" px="4" fontSize={24}>
        <Heading pt="4" size={{ base: "md", sm: "lg" }}>{data.title}</Heading>
        <Text fontSize="14px" color="#307AC6">{data.brand}</Text>
        <Text as="span"><span style={{ color: "#CC0D3A" }}>-{data.price.discount} </span>&#8377;{data.price.cost}</Text>
        <Text as="span" fontSize="11px" color="blackAlpha.700">M.R.P: <Text as="span" textDecoration="line-through"> {data.price.mrp}</Text></Text>
        <Box fontSize={14} pt="2">
          <Text>Inclusive of all taxes</Text>
          <Text>EMI start at &#8377;200</Text>
          <Text>EMI available</Text>
        </Box>
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
        <Divider/>
        <VStack mt="12" >
          <Heading size="md" textAlign="left" w="90%">Features :</Heading>
          <UnorderedList spacing={1}>
            {data.features.map((feature, index) =>
              <ListItem key={index} fontSize="sm">{feature}</ListItem>
            )}
          </UnorderedList>
        </VStack>
      </VStack>


      {/* button box */}
      <Show above="md">
        <VStack maxWidth="15rem" h="max-content" p="4" border="1px solid lightgray" borderRadius="8">
          <Text fontSize="14" fontWeight="bold"><span style={{ color: "#307AC6" }}>Free delivery</span> Monday, 28 October.Order within 19hrs.</Text>
          <Button size="sm" h="9" width="80%" borderRadius="16" bg="#FFD814" fontWeight="light" onClick={()=> cartMutation(data._id)} >Add to Cart</Button>

        </VStack>
      </Show>

    </Box>
  )
}
