import { ProductType } from "@/types";
import { Trash2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import AdminActions from "./admin-actions";
import { cn } from "@/lib/utils";

export default function AdminProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-1",
            product.status === "approved" && "bg-green-500",
            product.status === "pending" && "bg-yellow-500",
            product.status === "rejected" && "bg-red-500",
          )}
        />

        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl font-semibold tracking-tight">
              {product.name}
            </CardTitle>

            <Badge
              className={cn(
                "capitalize rounded-full px-3 py-1 font-medium",
                product.status === "pending" &&
                  "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
                product.status === "approved" &&
                  "bg-green-500/10 text-green-600 border-green-500/20",
                product.status === "rejected" &&
                  "bg-red-500/10 text-red-500 border-red-500/20",
              )}
            >
              {product.status}
            </Badge>
          </div>

          <CardDescription className="text-base leading-7 text-muted-foreground">
            {product.tagline}
          </CardDescription>

          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <Badge
                variant="secondary"
                key={tag}
                className="rounded-full px-3"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">By:</span>{" "}
              {product.submittedBy}
            </p>

            <p>
              {product.createdAt
                ? new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(product.createdAt?.toISOString() ?? ""))
                : ""}
            </p>

            <a
              href={product.websiteUrl ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:underline"
            >
              Visit Website
            </a>
          </div>

          <div className="flex flex-col gap-4 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2Icon className="size-4" />
              Delete
            </Button>

            <AdminActions
              status={product.status ?? ""}
              productId={product.id}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
