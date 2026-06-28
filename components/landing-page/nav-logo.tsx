import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 rounded-2xl px-2 py-1 transition-all duration-300"
    >
      <div className="relative flex h-17 w-17 items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/15 via-violet-500/15 to-fuchsia-500/15 blur-2xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

        {/* Ring */}
        <div className="relative flex h-[68px] w-[68px] items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <Image
            src="/nav-logo_3.png"
            alt="Projectory"
            width={65}
            height={65}
            priority
            className="relative z-10 object-contain transition duration-300 group-hover:brightness-110"
          />
        </div>
      </div>

      <div className="leading-none">
        <h1 className="text-[22px] font-black tracking-[-0.04em]">
          Projectory
        </h1>

        <span className="mt-1 block text-[11px] font-medium tracking-[0.18em] uppercase text-primary">
          PRODUCT DISCOVERY
        </span>
      </div>
    </Link>
  );
}
