import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Cart } from "./getCart";

const apiClient = new APIClient<Cart>('/cart')

const useAddCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiClient.addToCart,
        onSuccess: data => {
            queryClient.setQueryData(['cart'], data),
                localStorage.setItem('cartsss', JSON.stringify(data.cart))
        },
    })
}

export default useAddCart