import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  EyeIcon,
  RocketIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import StatsCard from "./stat-cards";

const LiveBadge = () => {
  return (
    <Badge
      variant="outline"
      className="px-4 py-2 mb-8 text-sm backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="text-muted-foreground">
        Join thousands of creators sharing their work
      </span>
    </Badge>
  );
};

const statsData = [
  {
    icon: RocketIcon,
    value: "2.5K+",
    label: "products Shared",
  },
  {
    icon: UsersIcon,
    value: "10K+",
    label: "Active Creators",
    hasBorder: true,
  },
  {
    icon: EyeIcon,
    value: "50K+",
    label: "Monthly Visitors",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20 mt-10">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <LiveBadge />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
            Share What You&apos;ve{" "}
            <span className="bg-linear-to-r from-[#c64d8d] via-[#9b6acb] to-[#6d89d8] bg-clip-text text-transparent">
              Built
            </span>
            ,
            <br />
            Discover What&apos;s{" "}
            <span className="bg-linear-to-r from-[#c85aa5] via-[#4786c9] to-[#c64d8d] bg-clip-text text-transparent">
              Launching
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            A community platform for creators to showcase their apps, AI tools,
            SaaS products, and creative products. Authentic launches, real
            builders, genuine feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full border border-white/10 bg-[linear-gradient(180deg,#2b2b2b_0%,#181818_45%,#090909_100%)] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,.45)] transition-all duration-300 hover:border-primary/30 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(168,85,247,.18)] active:scale-[0.98]"
            >
              <Link href="/submit" className="group flex items-center gap-2">
                <SparklesIcon className="size-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                Share Your Product
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-13 rounded-full border border-white/10 bg-white/3 px-8 text-base font-semibold text-foreground shadow-[0_8px_20px_rgba(0,0,0,.08)] backdrop-blur-xl transition-all duration-300 hover:border-primary/25 hover:bg-white/6 hover:shadow-[0_12px_30px_rgba(168,85,247,.10)] active:scale-[0.98]"
            >
              <Link href="/explore" className="group flex items-center gap-2">
                Explore Products
                <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
            {statsData.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
