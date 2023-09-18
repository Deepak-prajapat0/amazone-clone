import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client';
// import { products } from "../data/products";
// import useGameQueryStore from "../store";

interface Product{
    _id:string;
    title:string;
    brand:string
    description:string;
    thumbnail:string;
    image_url:string[];
    price:{mrp:number;cost:number,discount:string};
    features:string[];
    productDetails:[{key:string,value:string}];
    
}
const apiClient = new APIClient<Product>('/products');


const useProduct = (title:string) => useQuery({
    queryKey: ['product',title],
    queryFn: () => apiClient.get(title),
    refetchOnWindowFocus: false,
});

export default useProduct;