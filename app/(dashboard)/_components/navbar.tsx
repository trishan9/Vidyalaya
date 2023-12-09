import MobileSidebar from "./mobile-sidebar";
import NavBarRoutes from "./navbar-routes";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between h-full p-4 bg-white border-b shadow-sm">
      <MobileSidebar />

      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
