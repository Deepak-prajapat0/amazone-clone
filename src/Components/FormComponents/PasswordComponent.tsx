import { Heading, Text, FormControl, FormLabel, Input, Button, HStack, Link, Checkbox, useToast } from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../features/store";
import APIClient from "../../services/api-client";
import { setCredentials } from "../../features/auth/authSlice";
import { getUserCart } from "../../features/cart/cartSlice";

interface Props {
    email: string;
    register: any;
    errors: any;
    handleToggle: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: UseFormHandleSubmit<FieldValues>
}


export default function PasswordComponent({ email, register, handleToggle, handleInputChange, handleSubmit }: Props) {
    const dispatch= useAppDispatch();
    
    const navigate = useNavigate()
    const location = useLocation()
    const apiClient = new APIClient('/login')
    const toast = useToast({
        title: '',
        status: 'success',
        position: 'bottom-right',
        containerStyle: {
            maxWidth: '100%',
        },
        duration: 3000, // Toast duration in milliseconds
        isClosable: true, // Allow the user to close the toast
    })

    
    const formSubmit = async (data: any) => {
        apiClient.login(data).then((res:any) => {
          if(res.data){
              dispatch(setCredentials({ user: res.data.user, token: res.data.token }))
              localStorage.setItem("token", res.data.token)
              localStorage.setItem("user", res.data.user)
              localStorage.setItem('refresh-token', res.data.refreshJwtToken)
              navigate(location.state?.prevUrl)
              setTimeout(() => {
                  dispatch(getUserCart())
                  toast({ title: "Login successfully" })
              }, 1000);

          }
        })
    }




    return (
        <FormContainer>
            <form style={{ width: "100%", padding: "1.5rem", }} onSubmit={handleSubmit(formSubmit)}>
                <Heading fontWeight={200} size="lg">Sign in</Heading>
                <Text fontSize={13}>{email} <Link color="#0066c0" onClick={handleToggle}>change?</Link></Text>
                <FormControl my="1rem" >
                    <HStack justifyContent="space-between">
                        <FormLabel fontSize={12} fontWeight="bold">Enter password</FormLabel>
                        <Link color="#0066c0" fontSize={12} fontWeight="bold">Forgot password?</Link>
                    </HStack>
                    <Input type='text' size="sm" borderRadius={3} {...register("password", {
                        pattern: "/[0-9]/",
                        required: "password is required!",
                    })} onChange={handleInputChange} />
                    {/* {isError && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>} */}
                </FormControl>
                <Button width="100%" type="submit" size="sm" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Sign in</Button>
                <Checkbox size='sm' py="4" >Keep me signed in</Checkbox>
            </form>
        </FormContainer>
    )
}