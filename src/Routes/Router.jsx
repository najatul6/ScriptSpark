import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import MainLayout from "@/Layout/MainLayout/MainLayout";
import Signin from "@/Pages/Authentication/Signin";
import Signup from "@/Pages/Authentication/Signup";
import ErrorPage from "@/Pages/Common/ErrorPage";
import Overview from "@/Pages/Dashboard/Overview";
import Home from "@/Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LinkToScript from "@/Pages/LinkToScript/LinkToScript";
import ScriptToComment from "@/Pages/ScriptComment/ScriptToComment";
import ImageToComment from "@/Pages/ImageToComment/ImageToComment";
import ClientReply from "@/Pages/ClientReply/ClientReply";
import ProposalGenerator from "@/Pages/ProposalGenerator/ProposalGenerator";
import VoiceToScript from "@/Pages/VoiceToScript/VoiceToScript";
import UserManagement from "@/Pages/Dashboard/UserManagement";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "link-to-script",
        element: (
          <PrivateRoute>
            <LinkToScript />
          </PrivateRoute>
        ),
      },
      {
        path: "script-to-comment",
        element: (
          <PrivateRoute>
            <ScriptToComment />
          </PrivateRoute>
        ),
      },
      {
        path: "image-to-comment",
        element: (
          <PrivateRoute>
            <ImageToComment />
          </PrivateRoute>
        ),
      },
      {
        path: "client-reply",
        element: (
          <PrivateRoute>
            <ClientReply />
          </PrivateRoute>
        ),
      },
      {
        path: "voice-to-script",
        element: (
          <PrivateRoute>
            <VoiceToScript />
          </PrivateRoute>
        ),
      },
      {
        path: "proposal-generator",
        element: (
          <PrivateRoute>
            <ProposalGenerator />
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signUp",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path:"user-management",
        element:<UserManagement/>
      }
    ],
  },
  // {
  //     path:"/register",
  //     element:<Register/>
  // }
]);
export default Router;
