import { CheckCircle2, Clock3, FileText, Trash2, XCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ProductType } from "@/types";

export function UserStatCard({ products }: { products: ProductType[] }) {
  const pendingProducts = products?.filter((p) => p.status === "pending");
  const approvedProducts = products?.filter((p) => p.status === "approved");
  const rejectedProducts = products?.filter((p) => p.status === "rejected");
  const deletedProducts = products?.filter((p) => p.status === "deleted");

  const stats = {
    total: products?.length,
    pending: pendingProducts?.length,
    approved: approvedProducts?.length,
    rejected: rejectedProducts?.length,
    deleted: deletedProducts?.length,
  };

  const statCards = [
    {
      title: "Total Submissions",
      value: stats.total,
      icon: FileText,
      iconColor: "text-blue-500",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock3,
      iconColor: "text-amber-500",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      iconColor: "text-rose-500",
      gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    },
    {
      title: "Deleted",
      value: stats.deleted,
      icon: Trash2,
      iconColor: "text-zinc-500",
      gradient: "from-zinc-500/10 via-zinc-500/5 to-transparent",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="group relative overflow-hidden border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-xl"
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${card.gradient}`}
            />

            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-white/3 via-transparent to-transparent" />

            <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-primary/10 via-primary to-primary/10" />

            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <h2 className="mt-3 text-4xl font-bold tracking-tight">
                    {card.value}
                  </h2>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      Updated now
                    </span>
                  </div>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-background/60 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className={`h-7 w-7 ${card.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
