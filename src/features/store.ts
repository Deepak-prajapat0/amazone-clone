import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./cart/cartSlice";
import productSlice from "./product/productSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import orderSlice from "./order/orderSlice";



export const store = configureStore({
    reducer: {
        // auth: authSlice,
        products: productSlice,
        cart: cartSlice,
        order: orderSlice,
        wishlist: wishlistSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
