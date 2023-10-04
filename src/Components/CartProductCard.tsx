import { Box, Button, Divider, HStack, Heading, Image, Select, Stack, Text, VStack } from "@chakra-ui/react";
import { Product } from "../hooks/useProduct";
import { useState } from "react";
// import { updateUserCart } from "../features/cart/cartSlice";

interface CartProduct {
    productId: Product
    quantity: number
}
interface Props {
    item: CartProduct;
    updateQuantity: (productId: any,qty: number)=>void
}


export default function CartProductCard({ item, updateQuantity }: Props) {
    const[quantity,setQuantity]= useState(item.quantity)
    const [loading, setLoading] = useState(false)
 

    // const toast = useToast({
    //     title: 'dfgdfgdfgdfgdfg',
    //     status: 'success',
    //     position: 'bottom-right',
    //     containerStyle: {
    //         maxWidth: '100%',
    //     },
    //     duration: 3000,
    //     isClosable: true,
    // })

    const onChangeQuantity = async (qty:number ,product:Product = item.productId) => {
        // setLoading(true)
        setQuantity(+qty);
        updateQuantity(product,qty)
    }


    return (
        <>
            <Box p="2">
                <HStack minHeight="10rem" alignItems="flex-start">
                    <Image src={item.productId.thumbnail} height="100%" width={{ base: "4rem",sm:"5rem", md: "9rem" }} />
                    <VStack p={{ base: "0", md: "2" }} alignItems="start" position="relative">
                        <Heading fontSize={{ base: "12px", sm:"xs", md: "md" }} fontWeight="light" noOfLines={2}>{item.productId.title}</Heading>
                        <Text as="span" fontWeight="bold" >&#8377; {item.productId.price.cost}</Text>
                        <Text as="span" fontSize="12px" color="green">In stock</Text>
                        <Text as="span" fontSize="12px" color="gray">Eligible for free shipping</Text>
                        <Stack gap="2" flexDirection="row" position={{ base: "absolute", md: "static" }} bottom={{ base: "-3rem", md: "none" }} left={{ base: "-4.5rem" ,md:'none'}}>
                            <Select size="sm" width="5rem" isDisabled={loading} borderRadius="10px" shadow="md" onChange={(e) => onChangeQuantity(+e.target.value)}
                                value={quantity}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0,item.productId.stock).map((qty) =>
                                    <option key={qty} style={{ height: "6rem", padding: "10px 2px", width: "100%" }} value={qty}>{qty}</option>
                                )}
                            </Select>
                            <Divider orientation="vertical" />
                            <Button variant="link" size="xs" color="#307AC6" onClick={() => onChangeQuantity(0)}>Delete</Button>
                            <Button variant="link" size="xs" color="#307AC6">Save for later</Button>
                        </Stack>

                    </VStack>
                </HStack>
            </Box>
            <Divider />
        </>
    )
}
