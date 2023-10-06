import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../features/store'
import { getUserWishlist } from '../features/wishlist/wishlistSlice'
import SpinnerLoader from '../Components/SpinnerLoader'
import { Wishlist } from '../models/WishlishtModel'

export default function Wishlists() {
    
const dispatch = useAppDispatch()
const {loading,wishlist} = useAppSelector(state=>state.wishlist)
// const [wishlist,setWishlist]=useState<Wishlist>()

    useEffect(()=>{
        dispatch(getUserWishlist())
    },[])


  if (loading || !wishlist){
      return <SpinnerLoader/>
    }
  return (
    <div>{wishlist && wishlist.products.length >0 &&  
      <div>{JSON.stringify(wishlist)}</div>
    }</div>
  )
}
