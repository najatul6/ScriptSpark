import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, Bell, UserCircle, LogOut, ShieldCheck, 
  Settings, ChevronDown 
} from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [dbUser] = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isSuperAdmin = dbUser?.role === "SuperAdmin";

  return (
    <header className="h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      
      {/* Mobile sidebar trigger & Title */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-slate-950 border-r-white/10">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
        
        <h1 className="font-bold text-lg text-slate-200 tracking-tight hidden sm:block">
          Dashboard
        </h1>
      </div>

      {/* Right Side: Notifications & Profile */}
      <div className="flex items-center gap-3">
        
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
        </Button>

        {/* User Profile Dropdown */}
        <div className="relative ml-2">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all shadow-sm group"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full object-cover border border-white/10" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                 <UserCircle className="w-5 h-5 text-blue-400" />
              </div>
            )}
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-white leading-none mb-1">{user?.displayName?.split(' ')[0] || "User"}</p>
              <p className="text-[10px] text-slate-500 leading-none">Pro Plan</p>
            </div>
            <ChevronDown size={14} className={cn("text-slate-500 transition-transform", isProfileOpen && "rotate-180")} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="px-4 py-3 border-b border-white/5 mb-1">
                <p className="text-sm font-bold text-white truncate">{user?.displayName}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
              </div>

              {/* Admin Access */}
              {isSuperAdmin && (
                <div className="px-2 mb-2">
                   <p className="px-3 py-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">Administrator</p>
                   <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                     <ShieldCheck size={16} className="text-blue-500" /> Admin Panel
                   </Link>
                </div>
              )}

              <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                <Settings size={16} /> Settings
              </Link>

              <div className="h-[1px] bg-white/5 my-2 mx-2"></div>

              <button 
                onClick={logOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} /> Logout Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}