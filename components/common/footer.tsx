import Link from "next/link";
import { RocketIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-linear-to-b from-background to-primary/10">
      <div className="wrapper py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-white">
              <RocketIcon className="size-4" />
            </div>

            <div>
              <h3 className="font-semibold">Projectory</h3>
              <p className="text-sm text-muted-foreground">
                Discover what builders create.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/explore"
              className="transition-colors hover:text-foreground"
            >
              Explore
            </Link>

            <Link
              href="/submit"
              className="transition-colors hover:text-foreground"
            >
              Submit
            </Link>

            <Link
              href="/trending"
              className="transition-colors hover:text-foreground"
            >
              Trending
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Projectory. All rights reserved.</p>
          <p>Built for developers, founders and makers.</p>
        </div>
      </div>
    </footer>
  );
}
