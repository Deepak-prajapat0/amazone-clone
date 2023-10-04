import { Product } from "./ProductModel";

export interface Cart {
    _id: string;
    userId: string;
    cartItems: [
        {
            productId: Product
            quantity: number
        }
    ],
    totalPrice: number;
    totalItems: number;
}
