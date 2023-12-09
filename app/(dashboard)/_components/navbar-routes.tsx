import { UserButton } from "@clerk/nextjs";

const NavBarRoutes = () => {
  return (
    <div className="flex gap-2 ml-auto">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default NavBarRoutes;
