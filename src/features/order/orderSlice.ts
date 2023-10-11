import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
import { Order } from "../../models/orderModel";
// import { Cart } from "../../models/CartModel";


const apiClient = new APIClient('/order');

interface OrderResult {
    order: Order[];
    orderDetail:Order;
    loading: boolean;
    error: any
}

const initialState: OrderResult = {
    order:[],
    orderDetail:{
        _id:'',
        userId:'',
        orderDetails:{
            products:[
                {
                    productId: {
                        _id: '',
                        title: '',
                        brand: '',
                        description: '',
                        stock: 0,
                        image_url: [],
                        thumbnail: '',
                        price: {
                            cost: 0,
                            mrp: 0,
                            discount: ''
                        },
                        features: [],
                        productDetails: [{
                            key: '',
                            value: ''
                        }]
                    },
                    quantity:0,
                    canceled:false
                }
            ],
            totalItems:0,
            totalPrice:0,

        },
        shippingDetails:{
           name:'',
           phone:0,
           address:{
               house: '',
               street: '',
               city: '',
               state: '',
               pincode: 0
           }
        },
        status:'',
        paymentStatus:'',
        paymentId:'',
        canceledOn:'',
        createdAt:''
    },
    loading: false,
    error: ''
}






export const getUserOrders = createAsyncThunk('orders/fetch', async () => {
    const response = await apiClient.getOrders()
    return response.data
})

export const getOrderDetails = createAsyncThunk('order/fetch', async (payload:{id:string}) => {
    const response = await apiClient.getUserOrderDetails(payload.id); // Replace with your API endpoint
    return response.data;
});
export const cancelUserOrder = createAsyncThunk('order/update', async (payload:{id:string}) => {
    const apiClient= new APIClient('/order/cancel')
    const response = await apiClient.cancelOrder(payload.id); // Replace with your API endpoint
    return response.data;
});



const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserOrders.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            state.loading = false
            state.order = action.payload.order
        })
        builder.addCase(getUserOrders.rejected, (state, _action) => {
            state.loading = false
        })
        builder.addCase(getOrderDetails.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.loading = false
            state.orderDetail = action.payload.order
        })
        builder.addCase(cancelUserOrder.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(cancelUserOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orderDetail = action.payload.order
        })
    },
})

export default orderSlice.reducer