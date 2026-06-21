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
    <div className="flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 via-fuchsia-500 to-pink-500 shadow-lg shadow-violet-500/25 transition-all duration-300 group-hover:scale-105">
      <RocketIcon className="size-5 text-white" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-lg font-bold tracking-tight">Projectory</span>
      <span className="text-[11px] text-muted-foreground">
        Launch. Discover. Build.
      </span>
    </div>
  </Link>
);

export default function Header() {
  return (
    <header className="fixed left-1/2 top-3 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <div className="relative flex h-18 items-center justify-between rounded-[28px] border border-white/10 bg-background/50 px-6 lg:px-8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        <Logo />
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <FlameIcon className="size-4" />
            <span className="relative">
              Home
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
          <Link
            href="/explore"
            className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <CompassIcon className="size-4" />
            <span className="relative">
              Discover
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Suspense fallback={<LoaderIcon className="size-4 animate-spin" />}>
            <Show when="signed-out">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="rounded-xl hover:bg-gray-100"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="rounded-xl bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03] hover:opacity-95">
                  Get Started
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Button
                asChild
                className="rounded-xl bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03] hover:opacity-95"
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
    </header>
  );
}
