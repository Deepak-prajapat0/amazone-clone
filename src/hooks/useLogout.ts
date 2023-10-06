// import { logout } from "../features/auth/authSlice";
// import { useAppDispatch } from "../features/store";
// import APIClient from "../services/api-client";

// const useLogout = () => {

//     const logoutUser = async () => {

//         const apiClient = new APIClient('/logout')
//         const dispatch = useAppDispatch()
//         dispatch(logout())
//         try {
//             apiClient.logout()
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     return logoutUser;
// }

// export default useLogout