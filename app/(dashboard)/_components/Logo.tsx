import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        alt="Logo"
        src="/logo.png"
        height={150}
        width={150}
        className="w-14"
      />

      <div className="flex flex-col gap-0">
        <h1 className="text-xl font-semibold text-[#0B3954]">Vidyalaya</h1>

        <p className="text-xs font-semibold">Your Digital School</p>
      </div>
    </div>
  );
};

export default Logo;
