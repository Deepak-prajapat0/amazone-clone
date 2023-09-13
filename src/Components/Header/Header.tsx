import { Box, HStack, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { AiFillCaretDown, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import NavHeader from './NavHeader';

export default function Header() {
    return (
        <header style={{ backgroundColor: "#131921", color: "white" }}>
            <HStack p="2" justifyContent="space-between">
                <Text fontSize=" calc(12px + .8vw)" fontWeight="900">amazon.in</Text>
                <InputGroup maxWidth={"40rem"} color="black" outline="none">
                    <InputRightElement pointerEvents='none' backgroundColor="#FEBD69" borderEndRadius="4px" >
                        <AiOutlineSearch />
                    </InputRightElement>
                    <Input type='text' paddingLeft={4} placeholder='Search Amazon.in' bg={"white"} border="none" borderRadius={"5px"} outline="none" _focusVisible={{ border: "none" }} _focus={{ borderColor: "transparent", outline: "2.5px solid #FEBD69", outlineOffset: "0px" }} />
                </InputGroup>
               <HStack gap="4" px="1" fontWeight={800} fontSize="10px">
                    <VStack width="7.5rem" gap=".5">
                        <Text width="100%"  as="span">Hello, sign in</Text>
                        <HStack fontSize={13}>
                            <span>Account & Lists</span>
                            <AiFillCaretDown />
                        </HStack>
                    </VStack>
                    <VStack gap=".5">
                        <Text width="100%"  as="span">Returns</Text>
                        <span style={{fontSize:"12px"}}>& Orders</span>
                    </VStack>
                    <Box display="flex" alignItems="end" style={{ fontSize: "2.1rem" }}><i><AiOutlineShoppingCart /></i> <span style={{fontSize:"12px"}}>cart</span></Box>
               </HStack>
            </HStack>
            <NavHeader/>
        </header>
    )
}


{/* <InputLeftElement ml=".75" width="fit-content">
                        <Select placeholder='Select option' width="fit-content" >
                            <option value='option1' defaultChecked>All category</option>
                            <option value='option2'>Appliances</option>
                            <option value='option3'>Baby</option>
                            <option value='option3'>Beauty</option>
                            <option value='option3'>Books</option>
                            <option value='option3'>Clothing</option>
                        </Select>
                    </InputLeftElement> */}
