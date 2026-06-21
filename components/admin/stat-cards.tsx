import { cn } from "@/lib/utils";

export default function StatsCard({
  all,
  approved,
  pending,
  rejected,
}: {
  all: number;
  approved: number;
  pending: number;
  rejected: number;
}) {
  const stats = [
    {
      label: "Total",
      count: all,
      color: "bg-primary/10",
    },
    {
      label: "Pending",
      count: pending,
      color: "bg-yellow-500/10",
    },
    {
      label: "Approved",
      count: approved,
      color: "bg-green-500/10",
    },
    {
      label: "Rejected",
      count: rejected,
      color: "bg-red-500/10",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto">
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {stats.map(({ label, count, color }) => (
      <div
        key={label}
        className={cn(
          `
          group
          relative

          overflow-hidden

          rounded-2xl

          border
          border-border/60

          bg-card

          p-5

          transition-all
          duration-300

          hover:-translate-y-1
          hover:shadow-lg
          hover:border-border
          `,
          color
        )}
      >
        {/* Accent Line */}
        <div className="absolute left-0 top-0 h-1 w-full bg-current opacity-15" />

        <div className="flex h-full flex-col justify-between">
          <p
            className="
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            {label}
          </p>

          <div className="mt-4 flex items-end justify-between">
            <p
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              {count}
            </p>

            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-current
                opacity-60
              "
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
