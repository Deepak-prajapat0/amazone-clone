import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';


// interface User {
//     name: string;
//     phone: number;
//     email: string;
//     password: string;

// }
// interface Response {
//     status: boolean;
//     msg: string;
//     user: any
// }

const apiClient = new APIClient('/cart');
const token = localStorage.getItem('token');
console.log(token);


const useGetCart = () => useQuery({
    queryKey: ['cart',token],
    queryFn: () => apiClient.userCart(),
    enabled: !!token,
    refetchOnWindowFocus: false,
});

export default useGetCart;
