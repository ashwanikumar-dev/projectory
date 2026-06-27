import { LucideIcon } from "lucide-react";

export default function SectionHeader({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex items-start gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 via-primary/10 to-transparent shadow-lg backdrop-blur-xl">
          <Icon className="size-8 text-primary" />
        </div>

        <div className="flex-1">
          <h1 className="bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-4xl font-black tracking-tight text-transparent">
            {title}
          </h1>

          <div className="mt-4 h-px w-28 bg-linear-to-r from-primary via-primary/50 to-transparent" />

          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
