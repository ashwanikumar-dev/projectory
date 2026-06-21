"use client";

import {
  downvoteProductAction,
  upvoteProductAction,
} from "@/lib/products/product-actions";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function VotingButtons({
  hasVoted,
  voteCount: initialVoteCount,
  productId,
}: {
  hasVoted?: boolean;
  voteCount: number;
  productId: number;
}) {
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change),
  );

  const [isPending, startTransition] = useTransition();

  const handleUpvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(1);
      await upvoteProductAction(productId);
    });
  };

  const handleDownvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      await downvoteProductAction(productId);
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Upvote */}
      <Button
        onClick={handleUpvote}
        variant="ghost"
        size="icon"
        disabled={isPending}
        className={cn(
          `
        h-5
        w-5

        rounded-full

        border
        border-primary/15

        bg-background/50

        transition-all
        duration-300

        hover:bg-primary/10
        hover:border-primary/30
        hover:text-primary
        hover:scale-105
        `,
          hasVoted &&
            `
          bg-primary/10
          border-primary/30
          text-primary
          shadow-sm
        `,
        )}
      >
        <ChevronUpIcon className="size-3.5" />
      </Button>

      {/* Vote Count */}
      <span
        className="
        text-sm
        font-semibold
        tracking-tight
        leading-none

        transition-colors
        duration-300
        py-1
      "
      >
        {optimisticVoteCount}
      </span>

      {/* Downvote */}
      <Button
        onClick={handleDownvote}
        variant="ghost"
        size="icon"
        disabled={isPending}
        className={cn(
          `
        h-5
        w-5

        rounded-full

        border
        border-primary/15

        bg-background/50

        transition-all
        duration-300

        hover:bg-destructive/10
        hover:border-destructive/30
        hover:text-destructive
        hover:scale-105
        `,
          !hasVoted && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronDownIcon className="size-3.5" />
      </Button>
    </div>
  );
}
