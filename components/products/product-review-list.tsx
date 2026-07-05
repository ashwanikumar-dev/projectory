import { clerkClient } from "@clerk/nextjs/server";
import ProductReviewsList from "@/lib/products/product-review";
import Image from "next/image";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";

export default async function ProductReviews({
  productId,
}: {
  productId: number;
}) {
  const allReviews = await ProductReviewsList({ productId });

  const clerk = await clerkClient();

  const reviews = await Promise.all(
    allReviews.map(async (review) => {
      const user = await clerk.users.getUser(review.userId);

      return {
        ...review,
        user,
      };
    }),
  );

  return (
    <div className="space-y-3 p-7">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Community Reviews</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </p>
      </div>

      {reviews.map((comment) => (
        <div
          key={comment.id}
          className="px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:bg-background/70"
        >
          <div className="flex gap-4">
            {/* Avatar */}
            {comment.user.imageUrl ? (
              <img
                src={comment.user.imageUrl}
                alt={comment.user.fullName ?? "User"}
                className="mt-0.5 h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-sm font-semibold text-white">
                {(comment.user.fullName ?? comment.user.firstName ?? "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {comment.user.fullName ??
                    comment.user.firstName ??
                    comment.user.primaryEmailAddress?.emailAddress ??
                    "Anonymous"}
                </span>

                <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />

                <span className="text-xs text-muted-foreground">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-7 text-muted-foreground">
                {comment.content}
              </p>
              <div className="mt-4 flex items-center gap-5">
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-xs font-medium text-muted-foreground/60"
                >
                  <MessageCircleIcon className="size-3.5" />
                  Reply
                  <span className="rounded-full border border-border/50 bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Soon
                  </span>
                </button>

                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-xs font-medium text-muted-foreground/60"
                >
                  <ThumbsUpIcon className="size-3.5" />
                  Helpful
                  <span className="rounded-full border border-border/50 bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Soon
                  </span>
                </button>

                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-xs font-medium text-muted-foreground/60"
                >
                  Report
                  <span className="rounded-full border border-border/50 bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Soon
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
