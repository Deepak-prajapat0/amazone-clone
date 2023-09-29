import { useMutation, useQueryClient } from "@tanstack/react-query"
import APIClient from "../services/api-client";
import { Cart } from "./getCart";


const apiClient = new APIClient<Cart>('/cart')

const useUpdateCart = () => {
    return useMutation({
        mutationFn: apiClient.updateCart,
    })
}

export default useUpdateCart