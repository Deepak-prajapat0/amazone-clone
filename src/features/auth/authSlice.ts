import { createSlice } from '@reduxjs/toolkit';




const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,token:null,loading:false},
    reducers:{
        setCredentials:(state,action)=>{
            const {user ,token}= action.payload;
            state.user= user
            state.token = token
        },
        refreshJwt:(state,action)=>{
            const {user,token}= action.payload;
            state.user= user
            state.token = token
        },
        logout:(state)=>{
            state.user=null
            state.token=null
        }
    },
})


export const {setCredentials,logout} = authSlice.actions
export default authSlice.reducer;

export const selectUser =(state:any)=>state.auth.user
export const selectToken=(state:any)=>state.auth.token