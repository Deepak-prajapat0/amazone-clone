import axios from "axios";
import { Cart } from "../hooks/getCart";
// import { products } from "../data/products";

export interface FetchResponse<T> {
    products: T[];
}
export interface FetchResponse2<T> {
    product: T;
}
interface Response<T> {
    status: boolean;
    msg: string;
    user: T;
}
interface CartResponse {
    cart: Cart;
}

let abortController:any;
const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers["x-api-key"] = token;
        }
        if (abortController) {
            abortController.abort();
        }

        // Create a new AbortController for this request
        abortController = new AbortController();
        const signal = abortController.signal;
        config.signal = signal;
        // con = signal
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


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
    register =(data:any)=>{
        return axiosInstance.post<Response<T>>(this.endpoint+'/register',data)
        .then((res)=>console.log(res))
    }
    userCart=()=>{
        return axiosInstance.get<CartResponse>(this.endpoint)
        .then(res=>res.data.cart)
    }
    addToCart=(data:any)=>{
        return axiosInstance.post(this.endpoint, data)
        .then(res=>res.data.cart)
    }
    updateCart=(data:any)=>{
        return axiosInstance.put(this.endpoint, data)
        .then(res=>res.data.cart)
    }
}

export default APIClient;