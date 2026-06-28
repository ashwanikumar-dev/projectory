"use client";

import { useActionState, useEffect } from "react";
import { Loader, MessageSquare, SendHorizonal } from "lucide-react";
import { toast } from "sonner";

import { addCommentAction } from "@/lib/products/product-actions";
import { FormState } from "@/types";

import { Button } from "../ui/button";
import { FormField } from "../forms/form-field";

const initialState: FormState = {
  success: false,
  errors: undefined,
  message: "",
};

const addCommentStateAction = async (
  prevState: FormState | null,
  formData: FormData,
) => addCommentAction(prevState ?? initialState, formData);

export default function ProductComment({ productId }: { productId: number }) {
  const [state, formAction, isPending] = useActionState(
    addCommentStateAction,
    initialState,
  );

  const { errors, message } = state ?? initialState;

  useEffect(() => {
    if (!message) return;

    if (errors) {
      toast.error("Couldn't post your review. Please try again.");
    }
  }, [message, errors]);

  const getFieldErrors = (fieldName: string): string[] => {
    if (!errors) return [];
    return (errors as Record<string, string[]>)[fieldName] ?? [];
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-background via-background to-primary/5 p-6 shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-violet-500 shadow-lg shadow-primary/30">
            <MessageSquare className="size-6 text-white" />
          </div>

          <div>
            <h2 className="bg-linear-to-r from-white via-primary to-violet-400 bg-clip-text text-2xl font-bold text-transparent">
              Leave a Review
            </h2>
            <p className="text-sm text-muted-foreground">
              Tell others what you think about this product.
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="productId" value={productId} />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:border-primary/40 hover:bg-white/10">
            <FormField
              label="Your Review"
              name="content"
              id="description"
              placeholder="Write something amazing..."
              required
              onChange={() => {}}
              error={getFieldErrors("content")}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              ✨ Honest feedback helps everyone.
            </p>

            <Button
              type="submit"
              disabled={isPending}
              className="group h-12 rounded-2xl bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 px-7 text-white shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/50 active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  Post Review
                  <SendHorizonal className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
