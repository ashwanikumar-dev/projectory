import {
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  Clock3,
  XCircle,
  Trash2,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductType } from "@/types";

export function SubmissionCard({ product }: { product: ProductType }) {
  const status = product.status ?? "pending";
  const tags = product.tags ?? [];

  const statusMap = {
    approved: {
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      gradient: "from-emerald-500/10",
    },

    pending: {
      icon: Clock3,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      gradient: "from-amber-500/10",
    },

    rejected: {
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      gradient: "from-rose-500/10",
    },

    deleted: {
      icon: Trash2,
      color: "text-zinc-500",
      bg: "bg-zinc-500/10",
      border: "border-zinc-500/20",
      gradient: "from-zinc-500/10",
    },
  };

  const current =
    statusMap[status as keyof typeof statusMap] ?? statusMap.pending;
  const StatusIcon = current.icon;

  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border-border/50
        bg-background/80
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-xl
      "
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${current.gradient} via-transparent to-transparent`}
      />

      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/10 via-primary to-primary/10" />

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xl font-semibold tracking-tight">
              {product.name}
            </h3>

            {product.tagline && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {product.tagline}
              </p>
            )}
          </div>

          <div
            className={`
              shrink-0
              flex items-center gap-1.5
              rounded-full
              border
              px-3 py-1.5
              text-xs
              font-medium
              capitalize
              ${current.bg}
              ${current.border}
              ${current.color}
            `}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {status}
          </div>
        </div>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-primary/15
                  bg-primary/5
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-muted-foreground
                  transition-colors
                  hover:bg-primary/10
                "
              >
                #{tag}
              </span>
            ))}

            {tags.length > 4 && (
              <span
                className="
                  rounded-full
                  border
                  bg-muted/40
                  px-3
                  py-1.5
                  text-xs
                  text-muted-foreground
                "
              >
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="my-5 border-t border-border/50" />

        {/* Stats */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-xs">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{product.voteCount} Votes</span>
          </div>

          {product.createdAt && (
            <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-xs">
              <Clock3 className="h-3.5 w-3.5" />
              <span>
                {new Date(product.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Row */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="min-w-0 flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {product.submittedBy || "Anonymous"}
            </span>
          </div>

          {product.websiteUrl && (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                border
                bg-background/60
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-300
                hover:border-primary/30
                hover:bg-primary/5
                hover:shadow-md
              "
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
