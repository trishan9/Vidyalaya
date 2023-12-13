import { LucideIcon } from "lucide-react";

const IconBadge = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <div className="flex items-center justify-center p-2 rounded-full bg-[#BFD7EA] text-[#087E8B]">
      <Icon size={25} />
    </div>
  );
};

export default IconBadge;
