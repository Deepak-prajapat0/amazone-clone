import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

 const router = createBrowserRouter( [
       {
        path: '/',
        element:<Layout/> ,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home/> },
            // { path: 'game/:slug', element: <GameDetailPage /> }
        ]
    }
])

export default router