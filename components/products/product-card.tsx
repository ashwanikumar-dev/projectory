import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ProductType } from "@/types";
import VotingButtons from "./voting-button";

export default function ProductCard({ product }: { product: ProductType }) {
  const hasVoted = false;
  return (
    <Link href={`/products/${product.slug}`}>

      <Card className="group card-hover min-h-60 border border-white/10 bg-background/50 backdrop-blur-xl transition-all duration-300 hover:bg-background/70 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden hover:-translate-y-1">

        <div className="absolute inset-0 opacity-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.voteCount > 100 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-3 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription className="py-2">
                {product.description}
              </CardDescription>
            </div>
            <VotingButtons
              hasVoted={hasVoted}
              voteCount={product.voteCount}
              productId={product.id}
            />
          </div>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center gap-2">
            {product.tags?.map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
