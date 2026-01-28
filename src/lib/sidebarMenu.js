import {
  LayoutDashboard,
  UserCheck
} from "lucide-react";

const sidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    link: "/admin/dashboard/overview"
  },
  {
    id: "userManagement",
    label: "User Management",
    icon: UserCheck,
    link: "/admin/dashboard/user-management"
  },
  
];

export default sidebarMenu;
