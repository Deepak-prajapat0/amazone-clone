import { Heading, Text, FormControl, FormLabel, Input, Button, Highlight, HStack, Link } from "@chakra-ui/react";
import FormContainer from "./FormContainer";

interface Props {
    register: any;
    errors: any;
    setFilled: (value: boolean) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function PasswordComponent({ register, setFilled, handleInputChange }:Props) {
    return (
        <FormContainer>
            <form style={{ width: "100%", padding: "1.5rem", }}>
                <Heading fontWeight={200} size="lg">Sign in</Heading>
                <Text fontSize={13}> <Link color="#0066c0" onClick={()=>setFilled(false)}>change?</Link></Text>
                <FormControl my="1rem" >
                    <HStack justifyContent="space-between">
                        <FormLabel fontSize={12} fontWeight="bold">Enter password</FormLabel>
                        <FormLabel fontSize={12} fontWeight="bold">Forgot password?</FormLabel>
                    </HStack>
                    <Input type='text' size="sm" borderRadius={3} {...register("password", {
                        pattern: "/[0-9]/",
                        required: "password is required!",
                    })} onChange={handleInputChange}  />
                    {/* {isError && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>} */}
                </FormControl>
                <Button width="100%" size="sm" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Sign in</Button>
                <Text fontSize={12} mt="5">
                    <Highlight
                        query={['Use', 'Privacy Notice.']}
                        styles={{ color: "#0066c0" }}
                    >By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                    </Highlight>
                </Text>
            </form>
        </FormContainer>
    )
}
