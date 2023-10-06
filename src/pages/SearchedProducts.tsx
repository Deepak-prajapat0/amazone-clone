import { useEffect } from "react"
import { useAppDispatch } from "../features/store"
import { searchProduct } from "../features/product/productSlice"
import { useLocation } from "react-router-dom"

export default function SearchedProducts() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const search = query.get('q')
    useEffect(()=>{
      if (search){
          console.log(query)
            dispatch(searchProduct({q:search})).then(res=>{
                console.log(res)
            })
        }
    },[search])
  return (
    <div>{search}</div>
  )
}
