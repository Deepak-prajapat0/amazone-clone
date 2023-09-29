import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';
import { Product } from './useProduct';

export interface Cart{
    _id:string;
    userId:string;
    cartItems:[
        {
            productId:Product
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
