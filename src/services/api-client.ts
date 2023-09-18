import axios from "axios";
// import { products } from "../data/products";


export interface FetchResponse<T> {
    products: T[];
}
export interface FetchResponse2<T> {
    product: T;
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"
})

class APIClient<T>{
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint)
            .then(res => res.data.products);
    }
    get = (title: string) => {
        return axiosInstance
            .get<FetchResponse2<T>>(this.endpoint + '/' + title)
            .then((res) => res.data.product);
    };
}

export default APIClient;