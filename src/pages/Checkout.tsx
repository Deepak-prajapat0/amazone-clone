import { Box, FormControl, FormLabel, Heading, Input, Stack, VStack, Text, Button } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import APIClient from '../services/api-client';
import { useForm } from 'react-hook-form';
import FormHelper from '../Components/CustomComponent/FormHelper';




interface ShippingDetailsForm {
    name: string,
    phone: Number,
    house: string,
    street: string,
    city: string,
    state: string,
    pincode: Number,
}

const initialShippingDetailsState: ShippingDetailsForm = {
    name: '',
    phone: 0,
    house: '',
    street: '',
    city: '',
    state: '',
    pincode: 0
};



export default function Checkout() {
    const { register, handleSubmit, formState: { errors } } = useForm<ShippingDetailsForm>();
    const [cartData, setCartdata] = useState(JSON.parse(localStorage.getItem('cart') || ''))
    const [shippingDetails, setShippingDetails] = useState<ShippingDetailsForm>(initialShippingDetailsState)
    const [disabled,setDisabled]= useState(true)

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('cart') || '')
        setCartdata(data)
    }, [])


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setShippingDetails({
            ...shippingDetails,
            [name]: value
        })
    }

    const handleForm = () => {
        if (Object.keys(errors).length > 0) {
            return false
        }
        else {
            setDisabled(false)
            return true
        }
    }


    let apiClient = new APIClient('/order');
    // payment integration
    const createOrder = async () => {
        handleForm()
        if (!!handleForm) {
            await apiClient.placeOrder(shippingDetails).then(async () => {

                apiClient = new APIClient('/payment')

                const stripe = await loadStripe('pk_test_51NdRM1SGor658vyKfuSsZbktNn3sUMNAWjvXR6EfEAz8SYEK8n8hsQpIY81ZBpc4WTpjb0Ozs1k5LWPFwN1v9E3W00hsS1gbP2');
                const response = await apiClient.payment({ cart: cartData })

                const session = await response;
                localStorage.setItem('paymentResponse', JSON.stringify(session));
                console.log(session)

                const result = stripe?.redirectToCheckout({
                    sessionId: session.id
                })


                if ((await result)?.error) {
                    console.log('errorr')
                }
            })
        }
    }


    return (
        <>
            {cartData &&
                <Box p='4' pb='12' backgroundColor='#EAEDED'>
                    <Heading>Shipping Details</Heading>
                    <Stack flexDirection={{ base: 'column', md: 'row' }} gap='10' mt='8'>
                        <Box width={{ base: '100%', md: '90%' }} >

                            <Box width={{ base: '100%', md: '80%' }} p='6' border='1px solid lightgray' borderRadius='10px' backgroundColor='white'>
                                <form onSubmit={handleSubmit(handleForm)}>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input type='text'   {...register('name', {
                                            pattern: {
                                                value: /^[a-zA-Z]+$/,
                                                message: "Invalid input"
                                            },
                                            required: 'name is required!',
                                        })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.name?.message || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Input type='number'   {...register('phone', {
                                            pattern: {
                                                value: /^[6-9]\d{9}$/,
                                                message: 'invalid phone number'
                                            },
                                            required: 'phone number is required!',
                                        })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.phone?.message || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>House</FormLabel>
                                        <Input type='text'  {...register('house', {
                                            minLength: 2,
                                            required: 'house number is required!',
                                        })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.house?.message || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Street</FormLabel>
                                        <Input type='text'  {...register('street', {
                                            minLength: 1,
                                            required: 'street is required!',
                                        })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.street?.message || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>City</FormLabel>
                                        <Input type='text'  {...register('city', {
                                            pattern: {
                                                value: /^[a-zA-Z]+$/,
                                                message: 'Enter valid input'
                                            },
                                            required: 'city is required!',
                                        })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.city?.message || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>State</FormLabel>
                                        <Input type='text'   {...register('state', {
                                            pattern: {
                                                value: /^[a-zA-Z]+$/,
                                                message: 'Enter valid input'
                                            },
                                            required: 'state is required!',
                                        })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.state?.message || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Pincode</FormLabel>
                                        <Input type='number'
                                            {...register('pincode', {
                                                required: 'pincode is required',
                                                pattern: {
                                                    value: /^[1-9][0-9]{5}$/,
                                                    message: 'Enter a valid Pincode',
                                                },
                                            })}
                                            onChange={handleInput}
                                        />
                                        <FormHelper errors={errors.pincode?.message || ''} />
                                    </FormControl>
                                    <Button type='submit' >Save address</Button>
                                </form>
                            </Box>
                        </Box>
                        <Box p='4' height='fit-content' width={{ base: '100%', md: '18rem' }} border='1px solid lightgray' borderRadius='10px' backgroundColor='white'>
                            <VStack fontSize={10} gap='0' fontWeight='semibold'>
                                <Text as='span' color='#077e63'> Your order is eligible for FREE Delivery</Text>
                                <Text as='span'>Select the option at checkout</Text>
                            </VStack>
                            <Text as='h6' my='2' fontSize='md' fontWeight='bold' textAlign='center'>Subtotal ({cartData?.totalItems}items): &#8377;{cartData.totalPrice}</Text>
                            <Button colorScheme='yellow' bg='#FFD814' size='sm' w='100%' isDisabled={disabled || Object.keys(errors).length>0}  onClick={createOrder}>Proceed to Pay</Button>
                        </Box>
                    </Stack>
                </Box>

            }
        </>
    )
}
