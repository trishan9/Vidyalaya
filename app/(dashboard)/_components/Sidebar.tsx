import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-white border-r shadow-sm">
      <div className="p-6">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
