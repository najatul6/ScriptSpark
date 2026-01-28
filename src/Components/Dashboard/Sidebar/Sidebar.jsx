import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import sidebarMenu from "@/lib/sidebarMenu";

export default function Sidebar({ mobile }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
  className={cn(
    "h-screen border-r bg-background w-64 flex flex-col p-4",
    mobile && "h-screen"
  )}
>
  <h2 className="text-lg font-semibold mb-4 flex-shrink-0">My App</h2>

  <nav className="flex-1 flex flex-col overflow-hidden">
    <div className="overflow-y-auto flex-1 space-y-2">
      {sidebarMenu.map((item) => {
        const Icon = item.icon;
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isOpen = openMenus[item.id];

        return (
          <div key={item.id} className="w-full">
            {hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="flex w-full items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="flex items-center">
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {item.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-60" : "max-h-0"
                  )}
                >
                  <div className="pl-10 mt-2 space-y-2 text-sm">
                    {item.submenu.map((sub) => (
                      <NavLink key={sub.id} to={sub.link}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {sub.label}
                        </Button>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <NavLink to={item.link}>
                <Button variant="ghost" className="w-full justify-start">
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {item.label}
                </Button>
              </NavLink>
            )}
          </div>
        );
      })}
    </div>
  </nav>
</aside>

  );
}
