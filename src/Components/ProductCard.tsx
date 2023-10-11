import { Product } from '../models/ProductModel'
import { Box, Badge, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'



interface Props {
    product: Product
}
export default function ProductCard({ product }: Props) {
    return (
        <Box mx="1" p="2" minWidth="8rem" maxWidth='15rem'>
            <Image src={product.thumbnail} alt={product.title} height="9rem" width="100%" />
            <Link to={`/product/${product._id}`}><Text noOfLines={3} pointerEvents="all" cursor="pointer" _hover={{ textDecoration: 'underline' }} color="#088EC4" style={{ fontSize: "clamp(10px, 4vw, 14px)" }}>{product.title}</Text></Link>
            <Text fontSize={18} mt={2}>&#8377;{product.price.cost} <Badge padding="4px 8px" backgroundColor="#CC0C39" color="white" fontSize="11">{product.price.discount} off</Badge></Text>
        </Box>
    )
}
