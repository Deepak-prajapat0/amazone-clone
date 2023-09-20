import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';

export interface Cart{
    _id:string;
    userId:string;
    cartItems:[
        {
            productId:{
                _id:string;
                title:string;
                brand:string;
                description:string;
                price:{
                    mrp:number;
                    cost:number;
                    discount:string;
                }
                thumbnail:string;
                image_url:string[];
                features:string[];
                productDetails:[
                    {
                        key:string;
                        value:string;
                    }
                ]
            },
            quantity:number
        }
    ],
    totalPrice:number;
    totalItems:number;
}


const apiClient = new APIClient<Cart>('/cart');

const useGetCart = (token:string) => useQuery({
    queryKey: ['cart', token],
    queryFn: apiClient.userCart,
    enabled: !!token,
    refetchOnWindowFocus: false,
});

export default useGetCart;
