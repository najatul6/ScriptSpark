import {
  LayoutDashboard,
  Settings,
  Folder,
  BarChart2,
  Users,
  Calendar,
  HelpCircle,
  CreditCard,
  FileText
} from "lucide-react";

const sidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard/overview"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    link: "/dashboard/analytics"
  },
  {
    id: "projects",
    label: "Projects",
    icon: Folder,
    submenu: [
      { id: "active-projects", label: "Active Projects", link: "/dashboard/projects/active" },
      { id: "archived-projects", label: "Archived Projects", link: "/dashboard/projects/archived" },
      { id: "templates", label: "Templates", link: "/dashboard/projects/templates" }
    ]
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    submenu: [
      { id: "members", label: "Members", link: "/dashboard/team/members" },
      { id: "roles", label: "Roles & Permissions", link: "/dashboard/team/roles" }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    submenu: [
      { id: "profile", label: "Profile", link: "/dashboard/settings/profile" },
      { id: "account", label: "Account", link: "/dashboard/settings/account" },
      { id: "preferences", label: "Preferences", link: "/dashboard/settings/preferences" }
    ]
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
    link: "/dashboard/support"
  }
];

export default sidebarMenu;
