import axios from "axios";
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

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers:{"x-api-key":localStorage.getItem("token")}
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
    register =(data:any)=>{
        return axiosInstance.post<Response<T>>(this.endpoint+'/register',data)
        .then((res)=>console.log(res))
    }
    userCart=()=>{
        return axiosInstance.get(this.endpoint)
        .then(res=>res.data)
    }
    updateCart=(data:any)=>{
        return axiosInstance.put(this.endpoint+'/cart', data)
        .then(res=>res.data)
    }
}

export default APIClient;