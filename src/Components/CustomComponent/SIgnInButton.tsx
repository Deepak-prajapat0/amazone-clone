import { Button } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SIgnInButton() {
    const navigate = useNavigate();
    const location = useLocation()
  return (
      <Button size="sm" onClick={() => navigate('/signin', { state: {prevUrl :location.pathname} })} width="100%" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Sign in</Button>
  )
}
