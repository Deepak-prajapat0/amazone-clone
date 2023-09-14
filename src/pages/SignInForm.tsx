import { AbsoluteCenter, Box, Button, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import SignIn from '../Components/FormComponents/SignIn';
import PasswordComponent from '../Components/FormComponents/PasswordComponent';
import { useForm } from 'react-hook-form';


interface LoginFormState {
    email: string;
    password: string;
}

const initialLoginFormState: LoginFormState = {
    email: '',
    password: '',
};


export default function SignInForm() {
    const [filled,setFilled]= useState(false)
    const [loginDetails, setLoginDetails] = useState<LoginFormState>(initialLoginFormState);

    const {
        register,
        formState: { errors },
    } = useForm();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value,
        });
        console.log(name,value)
        console.log(errors)
    };


    return (
        <>

        {!filled ?
        <>
                    <SignIn {...{ register, errors,setFilled,handleInputChange}} />
                    <Box maxWidth="22rem" m="auto" pb="12">
                        <Box position='relative' py="8">
                            <Divider />
                            <AbsoluteCenter bg='white' px='4' fontSize={12}>
                                New to Amazon?
                            </AbsoluteCenter>
                        </Box>
                        <Button size="sm" width="100%" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Create your Amazon account</Button>
                    </Box>
        </>
        :
                <PasswordComponent {...{ register, errors, setFilled, handleInputChange }} />}

            
        </>
    )
}
