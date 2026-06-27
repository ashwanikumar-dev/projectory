import Link from "next/link";
import { RocketIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="relative mt-32 py-10 overflow-hidden pb-12">
      {/* Ambient Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="wrapper relative z-10">
        <div className="overflow-hidden rounded-[36px] border border-border/50 bg-background/60 p-10 shadow-[0_20px_80px_rgba(0,0,0,.18)] backdrop-blur-3xl">
          {/* Background Watermark */}
          <h1 className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[130px] font-black tracking-tight text-white/[0.03]">
            PROJECTORY
          </h1>

          <div className="relative z-10">
            {/* CTA */}
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-violet-500 to-fuchsia-500 shadow-lg shadow-primary/20">
                <RocketIcon className="size-7 text-white" />
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                Ready to launch your next project?
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
                Share your work, collect feedback, gain visibility and become
                part of a growing community of developers and makers.
              </p>

              <Button
                asChild
                className="mt-8 h-12 rounded-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 px-8 text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.03]"
              >
                <Link href="/submit">Launch Project</Link>
              </Button>
            </div>

            <div className="my-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Bottom */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-violet-500 to-fuchsia-500 shadow-lg shadow-primary/20">
                  <RocketIcon className="size-5 text-white" />
                </div>

                <div>
                  <h3 className="font-bold tracking-tight">Projectory</h3>

                  <p className="text-sm text-muted-foreground">
                    Discover products built by developers.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  {
                    href: "/explore",
                    label: "Explore",
                  },
                  {
                    href: "/submit",
                    label: "Submit",
                  },
                  {
                    href: "/trending",
                    label: "Trending",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-border/40 bg-background/40 px-5 py-2 text-sm text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
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
