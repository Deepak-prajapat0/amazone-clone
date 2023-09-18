import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SignInForm from "./pages/SignInForm";
import SignupForm from "./pages/SignupForm";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: '/signin', element: <SignInForm /> },
            { path: '/signup', element: <SignupForm /> },
            { path: '/product/:title', element: <ProductDetails /> },
            { path: '/cart', element: <Cart /> },
            // { path: 'game/:slug', element: <GameDetailPage /> }
        ]
    }
])

export default router