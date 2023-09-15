import { useParams } from "react-router-dom"
import useProduct from "../hooks/useProduct"
import { Box, Button, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"


export default function ProductDetails() {
  const params = useParams()
  const {data} = useProduct(params?.id||"")
  const [image,setImage] = useState(0)
 
  return (
    <SimpleGrid  p="4" columns={{ base: 1,md:2, lg: 3 }} justifyItems="center">
    {/* image box */}
    <Box display="flex" flexDirection={{base:"column",md:"row"}} alignItems={{base:"center",md:"start"}} gap="5px" >
      <Box display="flex" gap="6px" flexDirection={{base:"row",md:"column"}} minWidth="4rem">
          {data[0].image_url.map((url: string, index: number) =>
            <Image key={index} src={url} onClick={()=>setImage(index)} alt="multiple photos" height="5rem" width="100%" />
          )}
      </Box>
        <Image src={data[0].image_url[image]} width="80%"/>
    </Box>


    {/* detailbox */}
    <VStack alignItems="start" gap="1" fontSize={24}>
        <Heading pt="6" size={{ base:"md",sm:"lg"}}>{data[0].title}</Heading>
        <Text fontSize="14px" color="#307AC6">{data[0].brand}</Text>
        <Text as="span"><span style={{ color: "#CC0D3A" }}>-{data[0].price.discount} </span>&#8377;{data[0].price.cost}</Text>
        <Text as="span" fontSize="11px" color="blackAlpha.700">M.R.P: <Text as="span" textDecoration="line-through"> {data[0].price.mrp}</Text></Text>
        <Box fontSize={14} pt="2">
          <Text>Inclusive of all taxes</Text>
          <Text>EMI start at &#8377;200</Text>
          <Text>EMI available</Text>
        </Box>
    </VStack>


    {/* button box */}
      <VStack width="18rem" p="4" border="1px solid lightgray" borderRadius="8">
        <Text fontSize="14" fontWeight="bold"><span style={{ color:"#307AC6" }}>Free delivery</span> Monday, 28 October.Order within 19hrs.</Text>
        <Button size="sm" h="9" width="80%" borderRadius="16" bg="#FFD814" fontWeight="light" >Add to Cart</Button>
      
    </VStack>
   </SimpleGrid>
  )
}
