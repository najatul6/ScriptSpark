import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import MainLayout from "@/Layout/MainLayout/MainLayout";
import Signin from "@/Pages/Authentication/Signin";
import Signup from "@/Pages/Authentication/Signup";
import ErrorPage from "@/Pages/Common/ErrorPage";
import Overview from "@/Pages/Dashboard/Overview";
import Home from "@/Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {

            },
            {
                path: "signin",
                element: <Signin />
            },
            {
                path: "signUp",
                element: <Signup />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "overview",
                element: <Overview />
            }
        ]
    }
    // {
    //     path:"/register",
    //     element:<Register/>
    // }
])
export default Router;