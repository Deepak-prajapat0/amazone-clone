import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
import { Order } from "../../models/orderModel";
// import { Cart } from "../../models/CartModel";


const apiClient = new APIClient('/order');

interface OrderResult {
    order: Order[];
    loading: boolean;
    error: any
}

const initialState: OrderResult = {
    order:[],
    loading: true,
    error: ''
}



export const getUserOrders = createAsyncThunk('orders/fetch', async () => {
    const response = await apiClient.getOrders()
    return response.data
})
// export const updateCartAsync = createAsyncThunk('cart/updateCart', async (payload: { productId: string; quantity: number }) => {
//     const response = await apiClient.updateCart(payload); // Replace with your API endpoint
//     return response.data;
// });



const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserOrders.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            console.log(action.payload,'dfdsfsdfsdfdsf')
            state.loading = false
            state.order = action.payload.order
        })
    },
})

export default orderSlice.reducer