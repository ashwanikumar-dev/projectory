"use client";

import { ProductType } from "@/types";
import { Trash2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import AdminActions, { handleDelete } from "./admin-actions";
import { cn } from "@/lib/utils";

export default function AdminProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Card className="group relative flex h-full min-h-85 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1",
          product.status === "approved" && "bg-green-500",
          product.status === "pending" && "bg-yellow-500",
          product.status === "rejected" && "bg-red-500",
          product.status === "deleted" && "bg-gray-500",
        )}
      />

      <div className="flex flex-1 flex-col space-y-5">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-semibold tracking-tight">
            {product.name}
          </CardTitle>

          <Badge
            className={cn(
              "rounded-full border px-3 py-1 font-medium capitalize",
              product.status === "pending" &&
                "border-yellow-500/20 bg-yellow-500/10 text-yellow-600",
              product.status === "approved" &&
                "border-green-500/20 bg-green-500/10 text-green-600",
              product.status === "rejected" &&
                "border-red-500/20 bg-red-500/10 text-red-500",
              product.status === "deleted" &&
                "border-gray-500/20 bg-gray-500/10 text-gray-500",
            )}
          >
            {product.status}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col">
          <CardDescription className="line-clamp-3 min-h-18 text-base leading-7 text-muted-foreground">
            {product.tagline}
          </CardDescription>

          <div className="mt-4 flex flex-wrap gap-2">
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
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 text-sm">
          <div className="space-y-1 text-muted-foreground">
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
                  }).format(new Date(product.createdAt))
                : ""}
            </p>
          </div>

          {product.websiteUrl && (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Visit Website →
            </a>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/60 pt-4">
          {product.status !== "deleted" && (
            <Button
              size="sm"
              variant="outline"
              className="text-destructive rounded-2xl hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleDelete(product.id)}
            >
              <Trash2Icon className="size-4" />
              Delete
            </Button>
          )}

          <AdminActions status={product.status ?? ""} productId={product.id} />
        </div>
      </div>
    </Card>
  );
}
