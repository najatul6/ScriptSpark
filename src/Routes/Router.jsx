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
        element: <LinkToScript />,
      },
      {
        path: "script-to-comment",
        element: <ScriptToComment />,
      },
      {
        path: "image-to-comment",
        element: <ImageToComment />,
      },
      {
        path: "client-reply",
        element: <ClientReply />,
      },
      {
        path: "voice-to-script",
        element: <VoiceToScript />,
      },
      {
        path: "proposal-generator",
        element: <ProposalGenerator />,
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
    path: "/dashboard",
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
    ],
  },
  // {
  //     path:"/register",
  //     element:<Register/>
  // }
]);
export default Router;
