import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import NavBar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 md:pl-56 h-[80px] w-full z-10">
        <NavBar />
      </div>

      <div className="fixed inset-y-0 z-10 flex-col hidden w-56 h-full md:flex">
        <Sidebar />
      </div>

      <div className="h-full md:pl-56">{children}</div>
    </div>
  );
};

export default DashboardLayout;
