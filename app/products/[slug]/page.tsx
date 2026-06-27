import PageBackground from "@/components/common/page-background";
import SectionHeader from "@/components/common/section-header";
import ProductComment from "@/components/products/product-comments-form";
import ProductReviews from "@/components/products/product-review-list";
import VotingButtons from "@/components/products/voting-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products/products-select";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
  StarIcon,
  TrendingUpIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const products = await getFeaturedProducts();
  return products.map((product) => ({ slug: product.slug.toString() }));
};

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { name, description, websiteUrl, tags, voteCount, tagline } = product;

  return (
    <section>
      <PageBackground>
        <div className="wrapper relative z-10">
          <Link
            href="/explore"
            className="mb-12 mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/50 px-5 py-2.5 backdrop-blur-xl transition-all duration-300 hover:translate-x-1 hover:border-primary/40 hover:bg-primary/10"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Explore
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,.18)]">
                <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative z-10">
                  <SectionHeader
                    title={name}
                    icon={StarIcon}
                    description={tagline ?? ""}
                  />

                  <div className="mt-7 flex flex-wrap gap-3">
                    {tags?.map((tag) => (
                      <Badge
                        key={tag}
                        className="rounded-full border border-white/10 bg-amber-500 px-4 py-1.5 backdrop-blur-xl transition hover:border-primary/40 hover:bg-primary/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="my-10 h-px bg-linear-to-r from-transparent via-border to-transparent" />

                  <div>
                    <h2 className="mb-5 text-2xl font-bold">About</h2>
                    <p className="leading-8 text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  <div className="my-10 h-px bg-linear-to-r from-transparent via-border to-transparent" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:shadow-lg hover:border-primary/30">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <CalendarIcon className="size-5 text-primary" />
                      </div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Launched
                      </p>
                      <p className="mt-1 font-semibold">
                        {new Date(
                          product.createdAt?.toISOString() ?? "",
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/30">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <UserIcon className="size-5 text-primary" />
                      </div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Submitted By
                      </p>
                      <p className="mt-1 font-semibold">
                        {product.submittedBy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,.18)]">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-violet-500/10" />
                  <div className="relative z-10">
                    <div className="text-center">
                      <h3 className="text-lg font-bold">Community Score</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Vote if you found this project useful.
                      </p>

                      <div className="mt-8">
                        <div className="flex items-center justify-evenly gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-violet-500/20">
                            <TrendingUpIcon className="size-6 text-primary" />
                          </div>

                          <VotingButtons
                            productId={product.id}
                            voteCount={voteCount}
                            hasVoted={false}
                          />
                        </div>
                      </div>
                    </div>

                    {websiteUrl && (
                      <Button
                        asChild
                        className="mt-8 h-14 w-full rounded-2xl bg-linear-to-r from-primary via-violet-500 to-fuchsia-500 text-white transition hover:scale-[1.02]"
                      >
                        <a
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                          <ExternalLinkIcon className="ml-2 size-4" />
                        </a>
                      </Button>
                    )}

                    {voteCount > 100 && (
                      <div className="mt-8 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 p-px">
                        <div className="rounded-2xl bg-background/90 py-4 text-center backdrop-blur-xl">
                          <p className="font-semibold">🔥 Featured Product</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Loved by the community
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageBackground>

      <section className="mt-16 rounded-[32px] border border-border/40 bg-background/30 p-6 backdrop-blur-xl">
  <div className="space-y-8">

    <ProductComment productId={product.id} />

    <div className="border-t border-border/40 pt-8">
      <ProductReviews productId={product.id} />
    </div>

  </div>
</section>
    </section>
  );
}
