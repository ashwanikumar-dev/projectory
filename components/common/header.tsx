import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  CompassIcon,
  FlameIcon,
  LayoutDashboard,
  LoaderIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";
import CustomUserButton from "./custom-user-button";
import NavLogo from "../landing-page/nav-logo";

export default function Header() {
  return (
    <header className="fixed left-1/2 top-2 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <div className="relative">
        <div className="absolute inset-x-12 -bottom-px h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

        <div className="flex h-20 items-center justify-between rounded-full border border-border/50 bg-background/65 px-5 shadow-[0_12px_50px_rgba(0,0,0,.18)] backdrop-blur-3xl lg:px-7">
          <NavLogo />

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

            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground"
              >
                <LayoutDashboard className="size-4" />
                My dashboard
              </Link>
            </Show>
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
                    className="h-11 rounded-full px-5 font-medium text-muted-foreground transition-colors duration-300 hover:text-black"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="h-11 rounded-full border border-white/10 bg-[linear-gradient(180deg,#2A2A2A_0%,#161616_45%,#090909_100%)] px-6 text-white shadow-[0_10px_30px_rgba(0,0,0,.45)] transition-all duration-300 hover:border-white/20 hover:brightness-110 hover:shadow-[0_14px_36px_rgba(0,0,0,.55)] active:scale-[0.98]">
                    Get Started
                  </Button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Button
                  asChild
                  className="h-10 rounded-full border border-white/10 bg-linear-to-b from-neutral-800 via-neutral-900 to-black px-6 text-white shadow-[0_8px_24px_rgba(0,0,0,.35)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,.45)] active:scale-[0.98]"
                >
                  <Link href="/submit">
                    <SparklesIcon className="size-4" />
                    Launch Product
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
