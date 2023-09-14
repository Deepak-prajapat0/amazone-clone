import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function UserMenu() {
    const[open,setOpen] = useState(false)
  return (
      <Menu isOpen={ open }>
          <MenuButton onMouseEnter={()=>setOpen(true)}><AiFillCaretDown/></MenuButton>
          <MenuList onMouseLeave={()=>setOpen(false)} color="black">
              {/* MenuItems are not rendered unless Menu is open */}
              <Link to="/signin">Sign in</Link>
              <MenuItem>Open Closed Tab</MenuItem>
              <MenuItem>Open File</MenuItem>
          </MenuList>
      </Menu>
  )
}

// width = "90%" mx = "10px" backgroundColor = "#ffd814" color = "black" fontWeight = "200" _hover = {{ transition: "none", textDecoration: "underline" }} _active = {{ transition: "none" }}
