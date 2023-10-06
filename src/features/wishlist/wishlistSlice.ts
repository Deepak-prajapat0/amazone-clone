import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
import { Product } from "../../models/ProductModel";
import { Wishlist } from "../../models/WishlishtModel";

const apiClient = new APIClient('/wishlist');

interface WishlistResult {
    wishlist: Wishlist;
    loading: boolean;
    error: any
}

const initialState: WishlistResult = {
    wishlist: {
        _id: '',
        userId: '',
        products: [{
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
        }],
        createdAt: ''
    },
    loading: true,
    error: ''
}
export const addProductToWishlist = createAsyncThunk('wishlist/create', async (payload:{productId:string}) => {
    const response = await apiClient.addToWishlist(payload)
    return response.data
})
export const getUserWishlist = createAsyncThunk('wishlist/fetch', async () => {
    const response = await apiClient.getWishlist()
    return response.data
})


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addProductToWishlist.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload.wishlist
        })
        builder.addCase(addProductToWishlist.rejected, (state, _action) => {
            state.loading = false
            state.error = "something wrong"
        })
        builder.addCase(getUserWishlist.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(getUserWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload.wishlist
        })
        builder.addCase(getUserWishlist.rejected, (state, _action) => {
            state.loading = false
            state.error = "something wrong"
        })
    },
})

export default wishlistSlice.reducer