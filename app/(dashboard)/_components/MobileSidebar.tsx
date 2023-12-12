"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="transition-all md:hidden hover:opacity-75"
      >
        <Menu className="cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
