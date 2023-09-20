import { useMutation, useQueryClient } from "@tanstack/react-query"
import APIClient from "../services/api-client";
import { Cart } from "./getCart";


const apiClient = new APIClient<Cart>('/cart')

const useUpdateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiClient.updateCart,
        onSuccess: data => {
            queryClient.setQueryData(['cart'], data)
        },
    })
}

export default useUpdateCart