import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import SIgnInButton from '../CustomComponent/SIgnInButton'
import { useNavigate } from 'react-router-dom';

interface Props{
    user:string; 
}

export default function UserMenu({user}:Props) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    // const 
    return (
        <Menu isOpen={open}>
            <MenuButton onMouseEnter={() => setOpen(true)}><AiFillCaretDown /></MenuButton>
            <MenuList onMouseLeave={() => setOpen(false)} zIndex={50} color="black">
                {/* MenuItems are not rendered unless Menu is open */}
                {user ? <Button onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/')
                }}>Logout</Button> : <SIgnInButton />}
                <MenuItem>Your Orders</MenuItem>
                <MenuItem>Your Wish List</MenuItem>
            </MenuList>
        </Menu>
    )
}

// width = "90%" mx = "10px" backgroundColor = "#ffd814" color = "black" fontWeight = "200" _hover = {{ transition: "none", textDecoration: "underline" }} _active = {{ transition: "none" }}
