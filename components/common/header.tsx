import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  CompassIcon,
  FlameIcon,
  LoaderIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "../ui/button";
import CustomUserButton from "./custom-user-button";

const Logo = () => (
  <Link href="/" className="group flex items-center gap-3">
    <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary via-violet-500 to-fuchsia-500 shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105">
      <div className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />

      <RocketIcon className="relative z-10 size-5 text-white" />
    </div>

    <div>
      <h1 className="text-lg font-black tracking-tight">Projectory</h1>

      <p className="-mt-0.5 text-[11px] text-muted-foreground">
        Launch • Discover • Grow
      </p>
    </div>
  </Link>
);

export default function Header() {
  return (
    <header className="fixed left-1/2 top-2 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <div className="relative">
        <div className="absolute inset-x-12 -bottom-px h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

        <div className="flex h-16 items-center justify-between rounded-full border border-border/50 bg-background/65 px-4 shadow-[0_12px_50px_rgba(0,0,0,.18)] backdrop-blur-3xl lg:px-6">
          <Logo />

          <nav className="hidden items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl md:flex">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground"
            >
              <FlameIcon className="size-4" />
              Home
            </Link>

            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground"
            >
              <CompassIcon className="size-4" />
              Discover
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                  <LoaderIcon className="size-4 animate-spin" />
                </div>
              }
            >
              <Show when="signed-out">
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="rounded-full px-5 hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="rounded-full bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03] hover:opacity-95">
                    Get Started
                  </Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Button
                  asChild
                  className="rounded-full bg-linear-to-r from-primary via-violet-500 to-fuchsia-500 px-6 text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-primary/40"
                >
                  <Link href="/submit">
                    <SparklesIcon className="size-4" />
                    Launch Project
                  </Link>
                </Button>
                <CustomUserButton />
              </Show>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
