import { Product } from "./ProductModel";

export interface Order {
    _id: string;
    userId: string;
    orderDetails:{
        products:[
            {
                productId: Product
                quantity: number
                canceled:boolean
            }
        ];
        totalPrice: number;
        totalItems: number;
    };
    shippingDetails:{
        name:string;
        phone:number;
        address:{
            house: string;
            street:string;
            city:string;
            state:string;
            pincode:number
        }
    };
    status:string;
    paymentStatus:string;
    paymentId:string;
    canceledOn:string; 
    createdAt:string
  
}
