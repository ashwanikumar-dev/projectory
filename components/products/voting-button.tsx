"use client";

import { voteProductAction } from "@/lib/products/product-actions";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type VoteType = "UP" | "DOWN";

export default function VotingButtons({
  currentVote: initialVote,
  voteCount: initialVoteCount,
  productId,
}: {
  currentVote: VoteType | null;
  voteCount: number;
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [currentVote, setCurrentVote] = useState<VoteType | null>(initialVote);

  const upVote = () => {
    startTransition(async () => {
      const result = await voteProductAction(productId, "UP");

      if (result.success) {
        setCurrentVote(result.currentVote);
      }
    });
  };
  const downVote = () => {
    startTransition(async () => {
      const result = await voteProductAction(productId, "DOWN");

      if (result.success) {
        setCurrentVote(result.currentVote);
      }
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
        onClick={upVote}
        variant="ghost"
        size="icon"
        disabled={isPending}
        className={cn(
          "h-5 w-5 rounded-full border border-primary/15 bg-background/50 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:text-primary hover:scale-105",
          currentVote === "UP" &&
            "bg-primary/10 border-primary/30 text-primary shadow-sm",
        )}
      >
        <ChevronUpIcon className="size-3.5" />
      </Button>

      {/* Vote Count */}
      <span className="text-sm font-semibold tracking-tight leading-none transition-colors duration-300 py-1">
        {initialVoteCount}
      </span>

      {/* Downvote */}
      <Button
        onClick={downVote}
        variant="ghost"
        size="icon"
        disabled={isPending}
        className={cn(
          "h-5 w-5 rounded-full border border-primary/15 bg-background/50 transition-all duration-300 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive hover:scale-105",
          currentVote === "DOWN" &&
            "bg-destructive/10 border-destructive/30 text-destructive shadow-sm",
        )}
      >
        <ChevronDownIcon className="size-3.5" />
      </Button>
    </div>
  );
}
