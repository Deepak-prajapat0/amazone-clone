import axios from 'axios';


interface User {
   name:string;
   phone:number;
   email:string;
   password:string;

}
interface Response{
    status:boolean;
    msg:string;
    user:any
}

const userRegister = async(data:User) => {
    return await axios.post < Response>('http://localhost:3001/register',data).then(res => res.data)  
}
const userLogin = async(data:any) => {
    return  await axios.post('http://localhost:3001/login',data).then(res =>  res.data)  
}

export {userRegister,userLogin};