import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const footerLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/submit", label: "Submit" },
  { href: "/trending", label: "Trending" },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 py-10 overflow-hidden pb-12">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="wrapper relative z-10">
        <div className="overflow-hidden rounded-[36px] border border-border/50 bg-background/60 p-10 shadow-[0_20px_80px_rgba(0,0,0,.18)] backdrop-blur-3xl">
          <h1 className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[130px] font-black tracking-tight text-white/3">
            PROJECTORY
          </h1>

          <div className="relative z-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-8 flex justify-center">
                <Image
                  src="/footer-logo.png"
                  alt="Projectory"
                  width={110}
                  height={110}
                  priority
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.25)]"
                />
              </div>

              <h2 className="text-4xl font-black tracking-[-0.04em]">
                Ready to launch your next product?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
                Share your work, collect feedback, gain visibility, and become
                part of a growing community of builders.
              </p>

              <Button
                asChild
                className="mt-8 h-12 rounded-full border border-white/10 bg-[linear-gradient(180deg,#2A2A2A_0%,#161616_45%,#090909_100%)] px-8 text-white shadow-[0_12px_30px_rgba(0,0,0,.45)] transition-all duration-300 hover:border-white/20 hover:brightness-110"
              >
                <Link href="/submit">Launch product</Link>
              </Button>
            </div>

            <div className="my-12 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/footer-logo.png"
                  alt="Projectory"
                  width={42}
                  height={42}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-bold tracking-tight">Projectory</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover products built by developers.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2 border-t border-border/40 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <p>© 2026 Projectory. All rights reserved.</p>
              <p>Built with ❤️ for developers, founders & makers.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
