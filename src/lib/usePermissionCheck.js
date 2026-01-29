import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";

const usePermissionCheck = (permissionName) => {
    const [dbUser] = useUser();
    const navigate = useNavigate();

    const isSuperAdmin = dbUser?.role === "SuperAdmin";
    const hasPermission = isSuperAdmin || dbUser?.permission?.includes(permissionName);

    const handleClick = (e) => {
        if (!hasPermission) {
            e.preventDefault();
            navigate("/access-denied");
            return false;
        }
        return true;
    };

    return { handleClick, hasPermission, isSuperAdmin };
};

export default usePermissionCheck;