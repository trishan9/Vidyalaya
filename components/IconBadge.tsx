import { LucideIcon } from "lucide-react";

const IconBadge = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <div className="flex items-center justify-center p-2 rounded-full bg-sky-100 text-[#087E8B]">
      <Icon size={25} />
    </div>
  );
};

export default IconBadge;
