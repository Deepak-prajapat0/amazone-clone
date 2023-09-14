import {Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

export default function UserMenu() {
    const[open,setOpen] = useState(false)
  return (
      <Menu isOpen={ open }>
          <MenuButton onMouseEnter={()=>setOpen(true)}><AiFillCaretDown/></MenuButton>
          <MenuList onMouseLeave={()=>setOpen(false)}>
              {/* MenuItems are not rendered unless Menu is open */}
              <MenuItem>New Window</MenuItem>
              <MenuItem>Open Closed Tab</MenuItem>
              <MenuItem>Open File</MenuItem>
          </MenuList>
      </Menu>
  )
}
