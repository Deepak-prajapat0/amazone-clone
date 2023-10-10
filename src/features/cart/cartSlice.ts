import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
import { Cart } from "../../models/CartModel";


const apiClient  = new APIClient('/cart');

interface CartResult{
    cart:Cart;
    loading:boolean;
    error:any
}

const initialState:CartResult ={
    cart:{
        _id:'',
        userId:'',
        cartItems:[{
            productId:{
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
            quantity:0
        }],
        totalItems:0,
        totalPrice:0

    },
    loading:true,
    error:''
}



export const addToCart = createAsyncThunk('cart/add',async(payload:{productId:any})=>{
    const response = await apiClient.addToCart(payload)
    return response.data
})
export const getUserCart = createAsyncThunk('cart/fetch',async()=>{
    const response = await apiClient.userCart()
    return response.data
})
export const updateCartAsync = createAsyncThunk('cart/updateCart', async (payload: { productId: string; quantity: number }) =>{
    const response = await apiClient.updateCart(payload); // Replace with your API endpoint
    return response.data;
});



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.loading = false
            state.cart = action.payload.cart
        })
        builder.addCase(getUserCart.pending,(state,_action)=>{
            state.loading = true
        })
        builder.addCase(getUserCart.fulfilled,(state,action)=>{
            state.loading =false
            state.cart = action.payload.cart
        })
        builder.addCase(getUserCart.rejected,(state,_action)=>{
            state.loading =false
            state.error ="something wrong"
        })
        builder.addCase(updateCartAsync.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload.cart
        })
    },
})

export default cartSlice.reducer