// // // import React, { useEffect, useState } from "react";
// // // import { Route, useNavigate } from "react-router-dom";
// // // const ProtectedRoute = (props) => {
// // //     const navigate = useNavigate();
// // //     const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //     const checkUserToken = () => {
// // //         const userToken = localStorage.getItem('user-token');
// // //         if (!userToken || userToken === 'undefined') {
// // //             setIsLoggedIn(false);
// // //             return navigate('/auth/login');
// // //         }
// // //         setIsLoggedIn(true);
// // //     }
// // //     useEffect(() => {
// // //         checkUserToken();
// // //     }, [isLoggedIn]);
// // //     return (
// // //         <React.Fragment>
// // //         {
// // //             isLoggedIn? props.children : null
// // //             }
// // //         < /React.Fragment>
// // //     );
// // // }
// // // export default ProtectedRoute;


// import { useState } from 'react'


// const useToken = () => {
//     const [token, setToken] = useState(localStorage.getItem('token'))

//     const saveToken = (userToken:any) => {
//         localStorage.setItem('token', userToken)
//         setToken(userToken)
//     }
//     return {
//         setToken: saveToken,
//         token
//     }
// }

// export default useToken