import { Product } from "./ProductModel";

export interface Wishlist {
    _id: string;
    userId: string;
    products: [Product];
    createdAt: string

}
