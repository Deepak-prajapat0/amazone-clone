import { AbsoluteCenter, Box, Button, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import SignIn from '../Components/FormComponents/SignIn';
import PasswordComponent from '../Components/FormComponents/PasswordComponent';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();
    const location = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleToggle=()=>{
        if(loginDetails.email.length<5){
            return
        }
        setFilled(!filled)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value,
        });
    };


    return (
        <>

        {!filled ?
        <>
                    <SignIn {...{ register, errors, handleToggle,handleInputChange}} />
                    <Box maxWidth="22rem" m="auto" mt="-4rem" pb="2">
                        <Box position='relative' py="5">
                            <Divider />
                            <AbsoluteCenter bg='white' px='4' fontSize={12}>
                                New to Amazon?
                            </AbsoluteCenter>
                        </Box>
                        <Button size="sm" onClick={() => navigate('/signup',{state:location.state})} width="100%" backgroundColor="#ffd814" color="black" fontWeight="500" _hover={{ backgroundColor: "#f5d016" }} _active={{ transition: "none" }}>Create your Amazon account</Button>
                    </Box>
        </>
        :
                <PasswordComponent {...{ register,email:loginDetails.email, errors, handleToggle, handleInputChange, handleSubmit }} />}

            
        </>
    )
}
