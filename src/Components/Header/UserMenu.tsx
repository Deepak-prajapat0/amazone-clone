import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import SIgnInButton from '../CustomComponent/SIgnInButton'

export default function UserMenu() {
    const [open, setOpen] = useState(false)
    return (
        <Menu isOpen={open}>
            <MenuButton onMouseEnter={() => setOpen(true)}><AiFillCaretDown /></MenuButton>
            <MenuList onMouseLeave={() => setOpen(false)} zIndex={50} color="black">
                {/* MenuItems are not rendered unless Menu is open */}
                <SIgnInButton />
                <MenuItem>Open Closed Tab</MenuItem>
                <MenuItem>Open File</MenuItem>
            </MenuList>
        </Menu>
    )
}

// width = "90%" mx = "10px" backgroundColor = "#ffd814" color = "black" fontWeight = "200" _hover = {{ transition: "none", textDecoration: "underline" }} _active = {{ transition: "none" }}
