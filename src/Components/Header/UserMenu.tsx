import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import SIgnInButton from '../CustomComponent/SIgnInButton';
import { useNavigate } from 'react-router-dom';
import APIClient from '../../services/api-client';
import { useAppDispatch } from '../../features/store';
import { logout } from '../../features/auth/authSlice';


export default function UserMenu() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    // const {token}= useAppSelector(state=>state.auth)
    const token = localStorage.getItem('token')
    const dispatch = useAppDispatch()
    const api = new APIClient('/logout')

    // const 
    return (
        <Menu isOpen={open}>
            <MenuButton onMouseEnter={() => setOpen(true)}><AiFillCaretDown /></MenuButton>
            <MenuList onMouseLeave={() => setOpen(false)} zIndex={50} color="black">
                {/* MenuItems are not rendered unless Menu is open */}
                {token ? <Button onClick={()=>{
                    api.logout().then(()=>{
                        dispatch(logout())
                        navigate('/')
                    })
                }}>Logout</Button> : <SIgnInButton />}
                <MenuItem onClick={()=>navigate('/order')}>Your Orders</MenuItem>
                <MenuItem onClick={()=>navigate('/wishlist')}>Your Wish List</MenuItem>
            </MenuList>
        </Menu>
    )
}

// width = "90%" mx = "10px" backgroundColor = "#ffd814" color = "black" fontWeight = "200" _hover = {{ transition: "none", textDecoration: "underline" }} _active = {{ transition: "none" }}
