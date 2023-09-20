import { Button, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Select, Text } from "@chakra-ui/react";
import FormContainer from "../Components/FormComponents/FormContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../hooks/userHooks";
// import useGetCart from "../hooks/cartapi";


interface SignupFormState {
    name: string;
    phone: number;
    email: string;
    password: string;
}

const initialSignupFormState: SignupFormState = {
    name: "",
    phone: 0,
    email: '',
    password: '',
};


export default function SignupForm() {
    const registrationMutation = useMutation(userRegister)

    const location = useLocation()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
    } = useForm();
    const [signupDetails, setSignupDetails] = useState<SignupFormState>(initialSignupFormState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value,
        });
    }

    const userSignup = async(data:any) => {
        try {
            await registrationMutation.mutateAsync(data).then((res:any)=>{
                localStorage.setItem("token", res.user.token)
                localStorage.setItem("user",res.user.email)
                navigate(location.state?.prevUrl)
            })
        } catch (error) {
            console.error(error);
        }
        reset()
    }

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    },[])


    return (
        <FormContainer>
            <form style={{ padding: "1.5rem" }} onSubmit={handleSubmit(userSignup)}>
                <Heading>Create Account</Heading>
                <FormControl my="1rem" >
                    <FormLabel fontSize={12} fontWeight="bold">Your name</FormLabel>
                    <Input type='text' size="sm" borderRadius={3} placeholder="First and last name"
                        {...register("name", {
                            // pattern:/[]/,
                            required: "name is required!",
                        })}
                        onChange={handleInputChange} />
                    {/* {errors && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>} */}
                </FormControl>
                <FormControl my="1rem" >
                    <FormLabel fontSize={12} fontWeight="bold">Mobile number</FormLabel>
                    <HStack>
                        <Select size="sm" borderRadius={8} placeholder='+91 IN' width="9rem">
                        </Select>
                        <Input type='text' id="phone" size="sm" borderRadius={3} placeholder="Mobile number"
                            {...register("phone", {
                                // pattern:/[]/,
                                required: "phone is required!",
                            })}
                            onChange={handleInputChange} />
                    </HStack>
                    {/* {errors && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>} */}
                </FormControl>
                <FormControl my="1rem" >
                    <FormLabel fontSize={12} fontWeight="bold">Email</FormLabel>
                    <Input type='text' size="sm" borderRadius={3} placeholder="Your Email"
                        {...register("email", {
                            // pattern:/[]/,
                            required: "email is required!",
                        })}
                        onChange={handleInputChange} />
                    {/* {errors && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>} */}
                </FormControl>
                <FormControl my="1rem" >
                    <FormLabel fontSize={12} fontWeight="bold">Password</FormLabel>
                    <Input type='password' size="sm" borderRadius={3} placeholder="At least 6 characters"
                        {...register("password", {
                            // pattern:/[]/,
                            required: "password is required!",
                        })}
                        onChange={handleInputChange} />
                    <FormHelperText fontSize={12}>Password must be at least 6 characters</FormHelperText>
                    {/* {errors && <FormErrorMessage fontSize={12} mt="1">Enter your email or mobile phone number</FormErrorMessage>} */}
                </FormControl>
                <Button width="100%" type="submit" size="sm" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Sign up</Button>
                <Text pt="8" fontSize={14}>Already have an account? <Link to='/signin' style={{ color: "#0066c0", textDecoration: "underline" }} state={location.state}>signin</Link></Text>
            </form>
        </FormContainer>
    )
}
