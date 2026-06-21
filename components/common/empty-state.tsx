import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  message: string;
  icon?: LucideIcon;
};

export default function EmptyState({ message, icon: Icon }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-3xl border border-border/60 bg-card/50 px-8 py-14 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary/5 ring-1 ring-primary/10">
        {Icon && <Icon className="size-10 text-primary/70" />}
      </div>

      <h3 className="text-xl font-semibold tracking-tight">All caught up</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
