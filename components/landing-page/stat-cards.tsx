import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatsCard({
  icon: Icon,
  value,
  label,
  hasBorder,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  hasBorder?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative space-y-2 rounded-xl p-6",
        hasBorder && "border-x border-border/20",
      )}
    >
      <div className="absolute inset-0 rounded-xl bg-pink-500/20 blur-3xl" />

      <div className="relative flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>

      <p className="relative text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
