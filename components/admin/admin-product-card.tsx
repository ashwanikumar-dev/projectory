import { ProductType } from "@/types";
import { Trash2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import AdminActions from "./admin-actions";
import { cn } from "@/lib/utils";

export default function AdminProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Card className="border rounded-lg p-6 bg-background hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <CardTitle className="text-xl font-semibold flex justify-between items-center">
            {product.name}

            <Badge
              className={cn(
                product.status === "pending" &&
                  "bg-yellow-600/10 text-yellow-600 border-yellow-600",
                product.status === "approved" &&
                  "bg-green-500/10 text-green-600 border-green-500",
                product.status === "rejected" &&
                  "bg-red-500/10 text-red-500 border-red-500",
              )}
            >
              {product.status}
            </Badge>
          </CardTitle>
          <CardDescription className="flex flex-col gap-4">
            {product.tagline}
            <div className="flex items-center gap-2">
              {product.tags?.map((tag) => (
                <Badge variant="secondary" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-bold">By:</span> {product.submittedBy}
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
              <p>
                <a
                  href={product.websiteUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </p>
            </div>
          </CardDescription>
          <CardFooter>
            <Button variant="outline">
              <Trash2Icon className="size-4" />
              Delete
            </Button>
          </CardFooter>
        </div>
        <div className="lg:shrink-0">
          <AdminActions status={product.status ?? ""} productId={product.id} />
        </div>
      </div>
    </Card>
  );
}
