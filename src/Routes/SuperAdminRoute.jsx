import { Navigate, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import Loading from "@/Pages/Common/Loading";
import useUser from "@/hooks/useUser";

const SuperAdminRoute = ({ children }) => {
    const {  isLoading } = useAuth();
    const [DBuser] = useUser();
    const location = useLocation();
    if (isLoading || !DBuser) {
        return <Loading/>
    }
    if (DBuser?.role==="SuperAdmin") {
        return children;
    }
    return <Navigate to='/dashboard/new-orders' state={{ from: location }} replace></Navigate>
};

export default SuperAdminRoute;