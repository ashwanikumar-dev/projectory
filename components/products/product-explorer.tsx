"use client";
import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/products/product-card";
import { ProductType } from "@/types";
import { useMemo, useState } from "react";

const SORT_OPTIONS = [
  {
    id: "trending",
    label: "Trending",
    icon: TrendingUpIcon,
  },
  {
    id: "recent",
    label: "Recent",
    icon: ClockIcon,
  },
] as const;

export default function ProductExplorer({
  products,
}: {
  products: ProductType[];
}) {
  const [sortBy, setSortBy] = useState<"trending" | "recent">("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const filtered = [...products];

    if (searchQuery.trim()) {
      return filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    switch (sortBy) {
      case "trending":
        return filtered.sort((a, b) => b.voteCount - a.voteCount);

      case "recent":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime(),
        );

      default:
        return filtered;
    }
  }, [searchQuery, products, sortBy]);

  return (
    <div>
      <div className="mb-8 rounded-3xl border border-border/40 bg-background/60 p-4 shadow-[0_10px_30px_rgba(0,0,0,.08)] backdrop-blur-3xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="h-11 rounded-2xl border-border/40 bg-background/60 pl-11 backdrop-blur-xl"
            />
          </div>

          <div className="flex items-center gap-2">
            {SORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              const active = sortBy === option.id;

              return (
                <Button
                  key={option.id}
                  variant="ghost"
                  onClick={() => setSortBy(option.id)}
                  className={`h-11 shrink-0 rounded-2xl px-5 transition-all duration-300 ${
                    active
                      ? "bg-linear-to-r from-primary via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-primary/20"
                      : "border border-border/40 bg-background/50 hover:border-primary/30 hover:bg-primary/10"
                  }`}
                >
                  <Icon className="size-4" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {searchQuery && (
            <>
              {" "}
              matching{" "}
              <span className="font-medium text-foreground">
                &quot;{searchQuery}&quot;
              </span>
            </>
          )}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid-wrapper">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border/40 bg-background/40 py-14 text-center backdrop-blur-xl">
          <SearchIcon className="mx-auto mb-4 size-8 text-muted-foreground/50" />

          <h3 className="text-lg font-semibold">No products found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try another search term.
          </p>

          <Button
            variant="outline"
            className="mt-6 h-11 rounded-2xl border-border/40 px-6"
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
