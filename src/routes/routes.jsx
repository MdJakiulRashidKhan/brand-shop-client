import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddProduct from "../pages/AddProduct/AddProduct";
import PrivateRoute from "./PrivateRoute";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import EditProduct from "../pages/ProductEdit/ProductEdit";
import Cart from "../pages/Cart/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/addproduct",
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: "/allproduct",
                element: <PrivateRoute>
                    <ProductList></ProductList>
                </PrivateRoute>,
                loader:()=>fetch('https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/brand')
            },
            {
                path: "/details/:id",
                element: <PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>
            },
            {
                path: "/edit/:id",
                element: <PrivateRoute>
                    <EditProduct></EditProduct>
                </PrivateRoute>,
                loader:({params})=>fetch(`https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/brand/${params.id}`)
                
            },
            {
                path: "/cart",
                element: <PrivateRoute>
                    <Cart></Cart>
                </PrivateRoute>
            },
        ] 
    }
])
export default router;