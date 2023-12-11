"use client";

import { usePathname } from "next/navigation";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem, { ISidebarItemProps } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/analytics",
  },
];

const SidebarRoutes = () => {
  const pathName = usePathname();
  const routes = pathName?.startsWith("/instructor")
    ? instructorRoutes
    : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route: ISidebarItemProps) => (
        <SidebarItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
