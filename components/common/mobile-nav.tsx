import { CompassIcon, FlameIcon, LayoutDashboard, MenuIcon, SparklesIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import CustomUserButton from "./custom-user-button";

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85vw] max-w-xs">
          <div className="mt-8 flex flex-col gap-2">
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-muted"
              >
                <FlameIcon className="size-4" />
                Home
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/explore"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-muted"
              >
                <CompassIcon className="size-4" />
                Discover
              </Link>
            </SheetClose>

            <Show when="signed-in">
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-muted"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/submit">
                  <Button className="mt-4 w-full">
                    <SparklesIcon className="mr-2 size-4" />
                    Launch Product
                  </Button>
                </Link>
              </SheetClose>

              <div className="mt-6 flex justify-center">
                <CustomUserButton />
              </div>
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="outline" className="mt-4 w-full">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="w-full">Get Started</Button>
              </SignUpButton>
            </Show>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
