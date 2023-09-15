import { products } from './../data/products';
// import { products } from "../data/products";
// import useGameQueryStore from "../store";

// interface Product{
//     id:string|number;
//     title:string;
//     description:string;
//     thumbnail:string;
//     image_url:string[];
//     price:{mrp:number;cost:number,discount:string};
//     features:string[];
//     productDetails:[{key:string,value:string}];
    
// }
// const apiClient = new APIClient<Product>('/product');

// function getProduct(id:string){
//     return products.filter(x=>x.id===id)
// }

const useProduct = (id: string) => ({data:products.filter(x=>x.id === id)})

export default useProduct;