import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../features/store"
import { searchProduct } from "../features/product/productSlice"
import { useLocation } from "react-router-dom"
import SpinnerLoader from "../Components/SpinnerLoader"
import ProductCard from "../Components/ProductCard"
import { Box, SimpleGrid } from "@chakra-ui/react"

export default function SearchedProducts() {
    const dispatch = useAppDispatch()
    const {searchedProducts,loading} = useAppSelector(state=>state.products)
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const search = query.get('q')
    useEffect(()=>{
      if (search){
          console.log(query)
            dispatch(searchProduct({q:search}))
        }
    },[search])

    if(loading){
      return <SpinnerLoader/>
    }
  return (
    <div>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 ,lg:5 }} spacing='10px' justifyItems='center'>
      {searchedProducts.map((product,index)=>
        <ProductCard key={index} product={product} />
          )}
      </SimpleGrid>

    </div>
  )
}
