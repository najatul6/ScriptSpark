

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";

export default function Navbar() {
  return (
    <header className="border-b bg-background p-4 flex items-center justify-between">
      {/* Mobile sidebar trigger */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      <h1 className="font-semibold text-xl">Dashboard</h1>

      <div></div>
    </header>
  );
}
