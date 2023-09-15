import axios from "axios";
import { products } from "../data/products";


export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "534d9419fce745878aae6d7679715451"
    }
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint)
            .then(res => res.data);
    }
    get = (id: number | string) => {
        return products.filter(x=>x.id === id)
    };
}

export default APIClient;