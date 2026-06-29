"use cache";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";
import SectionHeader from "../common/section-header";
import { getFeaturedProducts } from "@/lib/products/products-select";

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from our community this week"
          />
          <Button
            asChild
            className="h-11 rounded-full border border-white/10 bg-white/3 px-5 text-sm font-medium text-foreground shadow-[0_8px_20px_rgba(0,0,0,.08)] backdrop-blur-xl transition-all duration-300 hover:border-primary/25 hover:bg-white/6 hover:shadow-[0_12px_28px_rgba(168,85,247,.10)] active:scale-[0.98]"
          >
            <Link href="/explore" className="group flex items-center gap-2">
              View All
              <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
