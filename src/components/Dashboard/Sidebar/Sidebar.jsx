import { Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import sidebarMenu from "@/lib/sidebarMenu";

export default function Sidebar({ mobile }) {
  return (
    <aside
      className={cn(
        "h-screen border-r border-white/5 bg-slate-950 w-64 flex flex-col p-4 transition-all duration-300",
        mobile && "fixed inset-y-0 left-0 z-50 shadow-2xl"
      )}
    >
      {/* Brand Logo Section */}
      <div className="flex items-center gap-3 px-3 mb-10 flex-shrink-0">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
          <Sparkles className="h-5 w-5 text-white fill-white" />
        </div>
        <Link to="/" className="flex flex-col">
          <h2 className="text-lg font-bold text-white leading-none tracking-tight">
            Script<span className="text-blue-500">Spark</span>
          </h2>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">AI Freelance Suite</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col overflow-hidden">
        <div className="overflow-y-auto flex-1 space-y-2 pr-2 custom-scrollbar">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.id} 
                to={item.link} 
                className="block group"
              >
                {({ isActive }) => (
                  <div
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                      isActive 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                    )}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full" />
                    )}

                    {Icon && (
                      <Icon className={cn(
                        "mr-3 h-5 w-5 transition-transform duration-300",
                        isActive ? "scale-110 text-white" : "group-hover:scale-110 group-hover:text-slate-100"
                      )} />
                    )}
                    
                    <span className={cn(
                      "font-medium text-sm tracking-wide",
                      isActive ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                    )}>
                      {item.label}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer / Status Card */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="relative group cursor-default">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-slate-900/50 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">System</p>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-none">
              AI Engine <span className="text-slate-500 mx-1">|</span> v1.5 Flash
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}