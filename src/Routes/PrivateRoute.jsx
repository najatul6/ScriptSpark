import useAuth from "@/hooks/useAuth";
import Loading from "@/Pages/Common/Loading";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");
  const location = useLocation();
  if (loading) return <Loading />;
  console.log("Loading State:",loading);

  if (user && token) {
    return children;
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;