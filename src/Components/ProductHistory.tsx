import { useEffect, useState } from "react";
import { Product } from "../models/ProductModel";
import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ProductHistory() {
    const[history,setHistory]= useState<Product[]>([])

    useEffect(()=>{
        let products = localStorage.getItem('productHistory');
        if(products){
            setHistory(JSON.parse(products))
        }
    },[])
  return (
      <Box padding='4' m='auto' my='6' width={{ base: '100%', md: '60%' }} boxShadow='xl'>
        <Heading>Keep shopping for</Heading>
          <SimpleGrid columns={{ base: 2, md: 2, lg: 6 }} minChildWidth='10rem' spacing={{ base: "1rem", md: 5 }} py='6' width="100%" overflowX="auto">
              {history.map((product, index: number) =>
                  <Box key={index} width='9rem' m='auto' >
                      <Image src={product.thumbnail} alt={product.title} width='100%' height='6rem' />
                      <Link to={`/product/${product._id}`} style={{ fontSize: "calc(12px 1vw)", color: '#44bae7' }}><Text noOfLines={2}>{product.title}</Text></Link>
                  </Box>
              )}
          </SimpleGrid>
        </Box>
  )
}
