import { useState } from "react";
import { Product } from "../models/ProductModel";

function useProductHistory() {
    const [productHistory, setProductHistory] = useState(() => {
        const history = localStorage.getItem('productHistory');
        return history ? JSON.parse(history) : [];
    });

    const addProductToHistory = (product:Product) => {
        // Check if the product is not already in the history based on a unique identifier (e.g., product ID)
        if (!productHistory.some((p: { _id: string; }) => p._id === product._id)) {
            const newHistory = [...productHistory, product];
            if (newHistory.length > 4) {
                newHistory.shift(); // Remove the oldest entry
            }
            setProductHistory(newHistory);
            localStorage.setItem('productHistory', JSON.stringify(newHistory));
        }
    };

    return { productHistory, addProductToHistory };
}

export default useProductHistory