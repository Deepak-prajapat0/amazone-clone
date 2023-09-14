import { Box, Button } from '@chakra-ui/react'
import FooterLinks from './FooterLinks'


export default function Footer() {
  return (
    <Box backgroundColor="#232F3E" color="white">
      <Button width="100%" height="3rem" mb="5" color="white" backgroundColor="#37475A" borderRadius={2} fontSize={12} fontWeight={500} _hover={{ transition: "none" }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} >Back To Top</Button>
        <FooterLinks/>
    </Box>
  )
}
