
export interface Product {
    _id: string;
    title: string;
    brand: string
    description: string;
    stock: number,
    thumbnail: string;
    image_url: string[];
    price: { mrp: number; cost: number, discount: string };
    features: string[];
    productDetails: [{ key: string, value: string }];

}