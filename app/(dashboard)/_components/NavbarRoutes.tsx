"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBarRoutes = () => {
  const pathName = usePathname();

  const isInstructorMode = pathName?.startsWith("/instructor");
  const isPlayerMode = pathName?.includes("/chapter");

  return (
    <div className="flex gap-2 ml-auto">
      {isInstructorMode || isPlayerMode ? (
        <Link href="/">
          <Button variant="ghost" size="sm">
            <LogOut className="w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/instructor/courses">
          <Button variant="ghost" size="sm">
            Instructor Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default NavBarRoutes;
