import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
import { Product } from "../../models/ProductModel";

const apiClient = new APIClient('/products');

interface ProductResult {
    products: Product[];
    loading: boolean;
    error: any
}

const initialState: ProductResult = {
    products: [],
    loading: true,
    error: ''
}
export const getAllProducts = createAsyncThunk('product/fetch', async () => {
    const response = await apiClient.getAll()
    return response.data
})


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllProducts.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products= action.payload.products
        })
        builder.addCase(getAllProducts.rejected, (state, _action) => {
            state.loading = false
            state.error = "something wrong"
        })
    },
})

export default productsSlice.reducer