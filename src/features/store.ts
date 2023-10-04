import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./cart/cartSlice";
import productSlice from "./product/productSlice";



export const store = configureStore({
    reducer:{
        cart:cartSlice,
        products:productSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch= useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
