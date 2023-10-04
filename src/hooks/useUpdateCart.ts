import { useQueryClient, useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Cart } from "./getCart";


const apiClient = new APIClient<Cart>('/cart')

const useUpdateCart = () => {
    let token = localStorage.getItem('token') || ''
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: apiClient.updateCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', token] })
        }
    })
}

export default useUpdateCart