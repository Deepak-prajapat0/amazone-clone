import { SimpleGrid, Text, VStack } from '@chakra-ui/react'

export default function FooterLinks() {
    let link1 = [
        "About Us",
        "Careers",
        "Press Releases",
        "Amazon Science"
    ]
    let link2 = [
        "Facebook",
        "Twitter",
        "Instagram"
    ]
    let link3 = [
        "Sell on Amazon",
        "Sell under Amazon Accelerator",
        "Protect and Build Your Brand",
        "Amazon Global Selling",
        "Become an Affiliate",
        "Fulfilment by Amazon",
        "Advertise Your Products",
        "Amazon Pay on Merchants"
    ]
    let link4 = [
        "COVID - 19 and Amazon",
        "Your Account",
        "Returns Centre",
        "100 % Purchase Protection",
        "Amazon App Download",
        "Help"
    ]


    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={{ base: "3rem", md:"20px"}} py="4" px={{base:"2rem",md:0}} justifyItems={{ md: "center" }}>
                <VStack   mt="0" alignItems="flex-start" >
                <Text fontSize={18} fontWeight="bold">Get to Know Us </Text>
                    {link1.map((link, index) =>
                        <Text key={index} cursor="pointer" fontSize="14px" _hover={{ textDecoration:"underline" }}>{link}</Text>
                    )}
                </VStack>
                <VStack   mt="0" alignItems="flex-start" >
                <Text fontSize={18} fontWeight="bold">Connect with Us </Text>
                    {link2.map((link, index) =>
                        <Text key={index} cursor="pointer" fontSize="14px" _hover={{ textDecoration:"underline" }}>{link}</Text>
                    )}
                </VStack>
                <VStack   mt="0" alignItems="flex-start" >
                <Text fontSize={18} fontWeight="bold">Make Money with Us </Text>
                    {link3.map((link, index) =>
                        <Text key={index} cursor="pointer" fontSize="14px" _hover={{ textDecoration:"underline" }}>{link}</Text>
                    )}
                </VStack>
                <VStack   mt="0" alignItems="flex-start" >
                <Text fontSize={18} fontWeight="bold">Let Us Help You </Text>
                    {link4.map((link, index) =>
                        <Text key={index} cursor="pointer" fontSize="14px" _hover={{ textDecoration:"underline" }}>{link}</Text>
                    )}
                </VStack>
        </SimpleGrid>
    )
}
