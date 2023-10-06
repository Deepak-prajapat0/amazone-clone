import { Box, HStack, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import UserMenu from './UserMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../features/store';
import { useState } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const [search ,setSearch]= useState('')
    const cart = useAppSelector(state=>state.cart.cart)
    const{user} = useAppSelector((state)=>state.auth)
    let localCart = localStorage.getItem('cart');
    if(localCart){
        localCart = JSON.parse(localCart).totalItems
    }
    

    // const cart = selector((state: any) => state.cart)
    const handleSearch =()=>{
            navigate(`/product/search?q=${search}`)
    }


 
    return (
        <header style={{ width: "100%", position: "fixed", zIndex: "50", backgroundColor: "#131921", color: "white" }}>
            <HStack p="2" justifyContent="space-between">
                <Link to="/" style={{ fontSize: " calc(12px + .8vw)", fontWeight: "900" }}>
                    <Image src="https://firebasestorage.googleapis.com/v0/b/angular-e92b6.appspot.com/o/amazon-white-removebg-preview%20(2).png?alt=media&token=da13b1e4-b7d8-41ea-96e0-a7d1945e7854" width="6rem" margin="15px 0 0 5px" color="white" />
                </Link>
                <InputGroup maxWidth={"40rem"} color="black" outline="none">
                    <InputRightElement backgroundColor="#FEBD69" borderEndRadius="4px" onClick={handleSearch} >
                        <AiOutlineSearch/>
                    </InputRightElement>
                    <Input type='text' onChange={(e)=>setSearch(e.target.value)} paddingLeft={4} placeholder='Search Amazon.in' bg={"white"} border="none" borderRadius={"5px"} outline="none" _focusVisible={{ border: "none" }} _focus={{ borderColor: "transparent", outline: "2.5px solid #FEBD69", outlineOffset: "0px" }} />
                </InputGroup>
                <HStack gap="4" px="1" fontWeight={800} fontSize="10px">
                    <VStack width="100%" gap=".5">
                        {user ? 
                            <Text width="fit-content" fontSize={10} as="span">{user}</Text>:
                            <Text width="100%" as="span">Hello, sign in</Text>
                        }
                        <HStack fontSize={13}>
                            <span>Account & Lists</span>
                            <UserMenu />
                        </HStack>
                    </VStack>
                    {/* || JSON.parse(localStorage.getItem('cart')||'')?.totalItems */}
                    <Box display="flex" alignItems="end" style={{ fontSize: "2.1rem", cursor: "pointer" }} onClick={() => navigate('/cart')}> <span style={{ position: 'relative' }} ><span className='count' style={{ position: 'absolute', fontSize: "12px" }}>{cart && cart.totalItems || localCart || 0}</span> <i><AiOutlineShoppingCart /></i></span> <span style={{ fontSize: "12px" }}>cart</span></Box>
                </HStack>
            </HStack>
        </header>
    )
}

