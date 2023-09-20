import { Box, Button, Divider, HStack, Heading, Image, Select, Stack, Text, VStack } from "@chakra-ui/react";

interface Product {
    productId: {
        _id: string;
        title: string;
        brand: string;
        description: string;
        price: {
            mrp: number;
            cost: number;
            discount: string;
        }
        thumbnail: string;
        image_url: string[];
        features: string[];
        productDetails: [
            {
                key: string;
                value: string;
            }
        ]
    },
    quantity: number
}

interface Props {
    item: Product;
}

export default function CartProductCard({ item }: Props) {
    return (
        <>
            <Box p="4">
                <HStack minHeight="10rem" alignItems="flex-start">
                    <Image src={item.productId.thumbnail} height="100%" width="9rem" />
                    <VStack p="2" alignItems="start">
                        <Heading size="md" fontWeight="light">{item.productId.title}</Heading>
                        <Text as="span" fontWeight="bold" >&#8377; {item.productId.price.cost}</Text>
                        <Text as="span" fontSize="12px" color="green">In stock</Text>
                        <Text as="span" fontSize="12px" color="gray">Eligible for free shipping</Text>
                        <Stack gap="2" flexDirection="row">
                            <Select size="sm" width="5rem" borderRadius="10px" shadow="md" value={item.quantity}>
                                {[1,2,3,4,5,6,7,8,9,10].map((qty)=>
                                    <option key={qty} style={{height:"4rem", padding:"10px 2px", width: "100%" ,backgroundColor:"red"}} value={qty}>{qty}</option>
                                    )}
                            </Select>
                            <Divider orientation="vertical"/>
                            <Button variant="link" size="xs" color="#307AC6">Delete</Button>
                            <Button variant="link" size="xs" color="#307AC6">Save for later</Button>
                        </Stack>

                    </VStack>
                </HStack>
            </Box>
            <Divider />
        </>
    )
}
