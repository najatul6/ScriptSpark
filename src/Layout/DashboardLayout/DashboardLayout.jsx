import Navbar from "@/components/Dashboard/Navbar/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0 shadow-2xl z-20">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 relative overflow-hidden">
        {/* Background Decorative Glow (Optional) */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Navbar with blur effect */}
        <header className="sticky top-0 z-10 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
          <Navbar />
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="max-w-[1600px] mx-auto p-4 md:p-8 min-h-full">
            {/* Page Transition Wrapper */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
              <Outlet />
            </div>
          </div>
          
          {/* Subtle Page Footer (Internal) */}
          <footer className="py-6 px-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">
              Powered by ScriptSpark AI Engine v1.5
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}