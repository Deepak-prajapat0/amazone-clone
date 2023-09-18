import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

interface Product {
    _id: string;
    title: string;
    brand: string;
    description: string;
    thumbnail: string;
    image_url: string[];
    price: { mrp: number; cost: number, discount: string };
    features: string[];
    productDetails: [{ key: string, value: string }];
}



const apiClient = new APIClient<Product>('/products');


const useProducts = () => useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getAll(),
    staleTime: 14800000
});

export default useProducts;