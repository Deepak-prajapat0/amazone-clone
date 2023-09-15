import { Heading, Text, Box, FormControl, FormLabel, Input, FormErrorMessage, Button, Highlight, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import FormContainer from './FormContainer'

interface Props{
    register:any;
    errors:any;
    handleToggle:()=>void;
    handleInputChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
}

export default function SignIn({ register, errors, handleToggle, handleInputChange }:Props) {
    const [helpMenu, setHelpMenu] = useState(false)
  return (
    <>
          <FormContainer>
              {/* form */}
              <form style={{ width: "100%", padding: "1.5rem", }}>
                  <Heading fontWeight={200} size="lg">Sign in</Heading>
                  {Boolean(errors.email)}
                  <FormControl my="1rem" >
                      <FormLabel fontSize={12} fontWeight="bold">Enter mobile phone number or email</FormLabel>
                      <Input type='text' name="email" size="sm" borderRadius={3}
                       {...register("email", {
                        pattern:"/[0-9]/",
                          required: "email is required!",
                      })} 
                      onChange={handleInputChange} />
                      {errors && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>}
                  </FormControl>
                  <Button onClick={handleToggle}  width="100%" size="sm" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Continue</Button>
              </form>
              <Text fontSize={12} mt="2" paddingX= "1.5rem">
                      <Highlight
                          query={['Use', 'Privacy Notice.']}
                          styles={{ color: "#0066c0" }}
                      >By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                      </Highlight>
                  </Text>
              {/* help menu */}
              <Box padding="1rem" fontSize={12} userSelect="none">
                  <i style={{ display: "inline" }} onClick={() => setHelpMenu(!helpMenu)}>{helpMenu ? <AiFillCaretDown /> : <AiFillCaretRight />} <Link to={''} style={{ color: "#0066c0" }}>Need help?</Link> </i>
                  {helpMenu &&
                      <VStack alignItems="flex-start" gap="5px" marginLeft="15px" marginTop="3px" color="#0066c0">
                          <Link to={''}>Forgot Password ?</Link>
                          <Link to={''}>Other issues with Sign-In</Link>
                      </VStack>
                  }
              </Box>
          </FormContainer>
    
    </>

  )
}
