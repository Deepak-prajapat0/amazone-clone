import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SignInForm from "./pages/SignInForm";
import SignupForm from "./pages/SignupForm";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: '/signin', element: <SignInForm /> },
            { path: '/signup', element: <SignupForm /> },
            { path: '/product/:id', element: <ProductDetails /> },
            { path: '/cart', element: <Cart /> },
            { path: '/cart/checkout', element: <Checkout /> },
            { path: '/payment/success', element: <PaymentSuccess /> },
            { path: '/payment/failed', element: <PaymentFailed /> },

        ]
    }
])

export default router