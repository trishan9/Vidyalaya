import MobileSidebar from "./MobileSidebar";
import NavBarRoutes from "./NavbarRoutes";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between h-full p-4 bg-white border-b shadow-sm">
      <MobileSidebar />

      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
