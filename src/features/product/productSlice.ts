import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../../services/api-client";
import { Product } from "../../models/ProductModel";


let apiClient = new APIClient('/products');

interface ProductsResult {
    products: Product[];
    product: Product;
    searchedProducts: Product[];
    loading: boolean;
    error: any
}

const initialState: ProductsResult = {
    products: [],
    product: {
        _id: '',
        title: '',
        brand: '',
        description: '',
        stock: 0,
        image_url: [''],
        thumbnail: '',
        price: {
            cost: 0,
            mrp: 0,
            discount: ''
        },
        features: [''],
        productDetails: [{
            key: '',
            value: ''
        }]
    },
    searchedProducts: [],
    loading: true,
    error: ''
}
export const getAllProducts = createAsyncThunk('product/fetch', async () => {
    const response = await apiClient.getProducts()
    return response.data
})
export const getProduct = createAsyncThunk('single/product/fetch', async (payload: { id: string }) => {
    const response = await apiClient.getProductById(payload.id)
    return response.data
})
export const searchProduct = createAsyncThunk('product/search', async (payload: { q: string }) => {
    apiClient = new APIClient('/products/search')
    const response = await apiClient.searchProduct(payload.q)
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
            state.products = action.payload.products
        })
        builder.addCase(getAllProducts.rejected, (state, _action) => {
            state.loading = false
            state.error = "something wrong"
        })
        builder.addCase(getProduct.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload.product
        })
        builder.addCase(getProduct.rejected, (state, _action) => {
            state.loading = false
            state.error = "something wrong"
        })
        builder.addCase(searchProduct.pending, (state, _action) => {
            state.loading = true
        })
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.loading = false
            state.searchedProducts = action.payload.products
        })
        builder.addCase(searchProduct.rejected, (state, _action) => {
            state.loading = false
            state.error = "something wrong"
        })
    },
})

export default productsSlice.reducer