import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import VotingButtons from "./voting-button";
import { ProductType } from "@/types";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  const hasVoted = false;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-background/60 shadow-[0_12px_35px_rgba(0,0,0,.08)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(139,92,246,.15)]">
        {/* Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="flex-1 pb-5">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-xl transition-colors group-hover:text-primary">
                  {product.name}
                </CardTitle>

                {product.voteCount > 100 && (
                  <Badge className="rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-3 text-white">
                    <StarIcon className="mr-1 size-3 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>

              <CardDescription className="mt-3 line-clamp-3 min-h-21 leading-6">
                {product.description}
              </CardDescription>
            </div>

            <div className="shrink-0 rounded-2xl border border-border/40 bg-background/60 p-2 backdrop-blur-xl">
              <VotingButtons
                hasVoted={hasVoted}
                voteCount={product.voteCount}
                productId={product.id}
              />
            </div>
          </div>
        </CardHeader>

        <CardFooter className="mt-auto flex flex-wrap gap-2 pt-2">
          {product.tags?.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full border border-border/40 bg-background/50 backdrop-blur-xl"
            >
              {tag}
            </Badge>
          ))}

          {product.tags && product.tags.length > 4 && (
            <Badge variant="outline" className="rounded-full">
              +{product.tags.length - 4}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
